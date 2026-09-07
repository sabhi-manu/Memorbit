import axiosInstance from "../../utils/axiosInstance";



export async function isFavouriteHandler(storyData) {
    const storyId = storyData._id
    const respose = await axiosInstance.put("/story/update-is-favourite/"+storyId, {isFavourite: !storyData.isFavourite})

    return respose.data
    
}