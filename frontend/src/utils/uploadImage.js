import axiosInstance from "./axiosInstance"


const uploadImage = async (imageFile)=>{

    const formData = new FormData()

    formData.append('image',imageFile)
    try {
        const response  = await axiosInstance.post('/story/image-upload',formData)
        console.log('image upload response data ===>',response)
        return response.data
    } catch (error) {
       console.log('Error uploading image : ',error) 
       throw error
    }

}

export default uploadImage