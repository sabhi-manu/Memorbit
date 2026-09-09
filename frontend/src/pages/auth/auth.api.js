import axiosInstance from "../../utils/axiosInstance";


 export async function signupApi (data){
    const response = await axiosInstance.post("/user/create-user",data)
    console.log("check the signup response data ==>",response)
    return response.data
}


 export async function loginApi (data){
    const response = await axiosInstance.post("/user/login",data)
    console.log("check the login response data ==>",response)
    return response.data
}

