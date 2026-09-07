import {  createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";



const AuthContext = createContext(null)

 export const AuthProvider =({children})=>{

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const setUserFunction = (data)=>setUser(data)

    useEffect(()=>{
        const checkAuthUser = async ()=>{
            try {
                const rsp = await axiosInstance.get("/user/get-user")
                console.log("check the current user api ===>",rsp)

                setUser(rsp.data.user)
                
            } catch (error) {
                setUser(null)
            }finally{
                setLoading(false)
            }
        }

        checkAuthUser()

    },[])

    return (
        <AuthContext.Provider value={{user,loading,setUserFunction}}>
            {children}
        </AuthContext.Provider>
    )
}

 export  function UseAuth() {
    return useContext(AuthContext)
 }