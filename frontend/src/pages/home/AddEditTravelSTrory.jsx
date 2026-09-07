import React, { useState } from "react";
import { MdAdd, MdClose, MdUpdate, MdDeleteOutline } from "react-icons/md";
import DateSelector from "../../componet/DateSelector";
import ImageSelector from "../../componet/ImageSelector";
import TagInput from "../../componet/TagInput";
import uploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { toast } from "react-toastify";

const AddEditTravelSTrory = ({
  storyInfo,
  type,
  onClose,
  getAllTRavelStories,
}) => {

  console.log('check the story info when type edit ==>',storyInfo)


  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStroyImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);

  const [error, setError] = useState("");

 

  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";
      let imageKey = "";

      if (storyImg) {
        const imageUploadRes = await uploadImage(storyImg);

        imageUrl = imageUploadRes.imageUrl || "";
        imageKey = imageUploadRes.key || "";
      }

      const response = await axiosInstance.post("/add-travel-story", {
        title,
        story,
        imageUrl,
        imageKey,
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment.valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success("Story Addedd Successfully");

        getAllTRavelStories();
        onClose();
      }
    } catch (error) {
      console.log("Error while add new travel story :", error);
      if(error.response && error.response.data && error.response.data.message){
        setError('An Unexpected error occurred . Please try again.')
      }
    }
  };


  //  update the story details 
   const updateTravelStory = async () => {
    const storyId = storyInfo._id
     try {
       let imageUrl = storyInfo.imageUrl || "";
        let imageKey = storyInfo.imageKey || "";

         if (storyImg instanceof File) {

            const imageUploadRes = await uploadImage(storyImg);

            imageUrl = imageUploadRes.imageUrl || "";
            imageKey = imageUploadRes.key || "";
        }

      const postData = {
            title,
            story,
            imageUrl,
            imageKey,
            visitedLocation,
            visitedDate: visitedDate
                ? moment(visitedDate).valueOf()
                : moment().valueOf(),
        };


    const response = await axiosInstance.put(
            `/edit-story/${storyId}`,
            postData
        );

        if (response.data?.story) {

            toast.success("Story updated successfully");

            getAllTRavelStories();
            onClose();
        }
    } catch (error) {
      console.log("Error while add new travel story :", error);
      if(error.response && error.response.data && error.response.data.message){
        setError('An Unexpected error occurred . Please try again.')
      }
    }
   };


   {/* check the type  is edit or add  */}
  const handleAddOrUpdateClick = () => {
    console.log("story update function....");
    console.log("input data ==>", {
      title,
      story,
      storyImg,
      visitedDate,
      visitedLocation,
    });

    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!story) {
      setError("Please enter the Story");
      return;
    }

    setError("");

    if (type === "edit") {
      updateTravelStory();
    } else {
      addNewTravelStory();
    }
  };

const handleDeleteStory = async () => {

    try {

        const response = await axiosInstance.delete(
            `/delete-story/${storyInfo._id}`
        );

        if (response.data?.success) {

            toast.success("Story deleted successfully");

            getAllTRavelStories();
            onClose();
        }

    } catch (error) {

        console.log("Error deleting story:", error);

        toast.error("Unable to delete story");
    }
};

  return (
    <div className="relative">
      <div className="flex items-center justify-between ">
        <h5 className="text-xl font-medium text-slate-700  ">
          {type == "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div
            className="flex items-center gap-3
           bg-cyan-50/50 p-2 rounded-lg"
          >
            {type == "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small " onClick={handleAddOrUpdateClick}>
                  {" "}
                  <MdUpdate className="text-lg" /> UPDATE STORY
                </button>

                <button className="btn-small btn-delete" onClick={handleDeleteStory}>
                  {" "}
                  <MdDeleteOutline className="text-lg" /> DELETE
                </button>
              </>
            )}
            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400 " />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-3">
          <label htmlFor="title" className="input-label">
            TITLE
          </label>
          <input
            type="text"
            name=""
            id="title"
            className="text-2xl text-slate-800 outline-none"
            placeholder="A Day at the Great Wall"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="my-3">
          <DateSelector date={visitedDate} setDate={setVisitedDate} />
        </div>

        <ImageSelector image={storyImg} setImage={setStroyImg} />

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="story" className="input-label">
            STORY
          </label>
          <textarea
            name="story"
            id="story"
            placeholder="Your Story"
            rows={10}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="text-sm text-slate-950 outline-none bg-slate-300 rounded p-2 "
          />
        </div>

        <div className="">
          <label htmlFor="">VISITED LOCATIONS</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelSTrory;
