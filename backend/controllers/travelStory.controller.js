const {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const TravelStory = require("../models/travelStory.model");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3client = require("../configs/awsS3.config");
const generateSignedUrl = require("../configs/generateSignedUrl");

async function createStoryController(req, res) {
  const { title, story, visitedLocation, visitedDate, imageKey } =
    req.body;
  const { userId } = req.user;
  console.log("user id ==>", userId);

  try {
    if (!title || !story || !imageKey || !visitedLocation || !visitedDate) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
      });
    }

    const parseVisitedDate = new Date(parseInt(visitedDate));

    const travelStory = new TravelStory({
      title,
      story,
      visitedLocation,
      visitedDate: parseVisitedDate,
      // imageUrl,
      userId,
      imageKey,
    });
    await travelStory.save();

    res.status(201).json({
      message: "Added successfully.",
      story: travelStory,
    });
  } catch (error) {
    console.log("Error while create story  ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error .",
    });
  }
}

async function getTravelStoryController(req, res) {
  const { userId } = req.user;
  try {
    const travelStories = await TravelStory.find({ userId }).sort({
      isFavourite: -1,
    });

    const storiesWithUrls = await Promise.all(
      travelStories.map(async (story)=>{
        const signUrl = await generateSignedUrl(story.imageKey)
        return {...story.toObject(),imageUrl:signUrl}
      })
    )


    res.status(200).json({
      message: "stories fetched successfully.",
      stories: storiesWithUrls,
    });
  } catch (error) {
    console.log("Error while getting all story  ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error .",
    });
  }
}

async function uploadImageController(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: true, message: "No image uploaded" });
    }
    const fileName = `travel-stories/${Date.now()}-${req.file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await s3client.send(command);

    console.log("image upload successful.",fileName)

    // const getCommand = new GetObjectCommand({
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: fileName,
    // });

    // const url = await getSignedUrl(s3client, getCommand);

    const previewUrl = await generateSignedUrl(fileName);

    res.status(200).json({
      message: "image upload successfully.",
      imageUrl: previewUrl,
      key: fileName,
    });
  } catch (error) {
    console.log("Error while uploading image  ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error .",
    });
  }
}

async function deleteingImageController(req, res) {
  try {
    const { key } = req.query;
    if (!key) {
      return res.status(400).json({
        error: true,
        message: "key parameter is required.",
      });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    await s3client.send(command);
    res.status(200).json({
      message: "image delete successfully.",
    });
  } catch (error) {
    console.log("Error while deleting image  ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error .",
    });
  }
}


async function updateStoryController(req, res) {
  try {
    const { id } = req.params;
    const { title, story, visitedLocation, visitedDate, imageKey } = req.body;
    const { userId } = req.user;

    if (!title || !story || !visitedLocation || !visitedDate) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
      });
    }

    const parseVisitedDate = new Date(parseInt(visitedDate));

    const travelStory = await TravelStory.findOne({ _id: id, userId: userId });

    if (!travelStory) {
      return res.status(404).json({ error: true, message: "Travel story not found." });
    }

    const oldImageKey = travelStory.imageKey;

    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageKey = imageKey || process.env.DEFAULT_IMAGE_KEY;
    travelStory.visitedDate = parseVisitedDate;

    await travelStory.save();

    if (
      oldImageKey &&
      imageKey &&
      oldImageKey !== imageKey &&
      oldImageKey !== process.env.DEFAULT_IMAGE_KEY
    ) {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: oldImageKey,
      });
      await s3client.send(command);
    }

    const signedUrl = await generateSignedUrl(travelStory.imageKey);

    res.status(200).json({
      message: "story update successfully.",
      story: { ...travelStory.toObject(), imageUrl: signedUrl },
    });
  } catch (error) {
    console.log("Error while update story  ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error .",
    });
  }
}

async function deleteStoryController(req, res) {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const travelStory = await TravelStory.findOne({ _id: id, userId: userId });
    if (!travelStory) {
      return res.status(404).json({
        error: true,
        message: "Travel story not found.",
      });
    }

    const imageKey = travelStory.imageKey;

    if (imageKey && imageKey !== process.env.DEFAULT_IMAGE_KEY) {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey,
      });

      await s3client.send(command);
    }

    await travelStory.deleteOne();

    res.status(200).json({
      message: "Travel story deleted successfully.",
    });
  } catch (error) {
    console.log("Error while deleteing story  ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error .",
    });
  }
}

async function updateFavouriteController(req, res) {
  const { id } = req.params;
  const { isFavourite } = req.body;
  const { userId } = req.user;
  try {
    if (typeof isFavourite !== "boolean") {
      return res.status(400).json({
        error: true,
        message: "isFavourite must be a boolean value.",
      });
    }

    const travelStory = await TravelStory.findOne({ _id: id, userId: userId });

    if (!travelStory) {
      return res.status(404).json({
        error: true,
        message: "Travel story not found.",
      });
    }

    travelStory.isFavourite = isFavourite;
    await travelStory.save();

    res.status(200).json({
      message: "Story updated successfully.",
      story: travelStory,
    });
  } catch (error) {
    console.log("Error while update isFavourite ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error.",
    });
  }
}

async function searchStoryController(req, res) {
  const { query } = req.query;
  const { userId } = req.user;

  if (!query) {
    return res.status(404).json({
      error: true,
      message: "query is required.",
    });
  }

  try {
    const searchResult = await TravelStory.find({
      userId: userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { story: { $regex: query, $options: "i" } },
        { visitedLocation: { $regex: query, $options: "i" } },
      ],
    }).sort({ isFavourite: -1 });

    const storiesWithUrl = await Promise.all(
      searchResult.map(async(story)=>{
       const imageUrl = await generateSignedUrl(story.imageKey)
        return {...story.toObject(),imageUrl:imageUrl}
      })
    )

    console.log("check imageUrl =>",storiesWithUrl)

    res.status(200).json({
      message: "Query stories successfully.",
      stories: storiesWithUrl,
    });
  } catch (error) {
    console.log("Error while searhing story ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error.",
    });
  }
}

async function storyByDateController(req, res) {
  const { startDate, endDate } = req.query;
  const { userId } = req.user;

  try {
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));

    const filteredStories = await TravelStory.find({
      userId: userId,
      visitedDate: { $gte: start, $lte: end },
    }).sort({ isFavourite: -1 });

    const storiesWithUrl = await Promise.all(
       filteredStories.map(async (story)=>{
        const imageUrl = await generateSignedUrl(story.imageKey)
        return {...story.toObject(),imageUrl:imageUrl}
       })
    )

    res.status(200).json({
      message: "Query stories successfully.",
      stories: storiesWithUrl,
    });
  } catch (error) {
    console.log("Error while searhing by date ==>", error);
    return res.status(500).json({
      error: true,
      message: "internal server error.",
    });
  }
}

module.exports = {
  createStoryController,
  getTravelStoryController,
  uploadImageController,
  deleteingImageController,
  updateStoryController,
  deleteStoryController,
  updateFavouriteController,
  searchStoryController,
  storyByDateController,
};
