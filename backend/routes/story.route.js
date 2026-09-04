const express = require("express")
const upload = require("../configs/multer")
const authenticateToken = require("../utilities")
const travelStoryController = require("../controllers/travelStory.controller")


const route = express.Router()

route.post("/add-travel-story",authenticateToken,travelStoryController.createStoryController)
route.get("/get-all-stories",authenticateToken,travelStoryController.getTravelStoryController)

route.post("/image-upload",upload.single('image'),travelStoryController.uploadImageController)
route.delete("/delete-image/:imageUrl",authenticateToken,travelStoryController.deleteingImageController)

route.put("/edit-story/:id",authenticateToken,travelStoryController.updateStoryController)
route.delete('/delete-story/:id',authenticateToken,travelStoryController.deleteStoryController)
route.patch("/update-is-favourite/:id",authenticateToken,travelStoryController.updateFavouriteController)

route.get("/search",authenticateToken,travelStoryController.searchStoryController)
route.get("/travel-stories/filter",authenticateToken,travelStoryController.storyByDateController)

module.exports = route