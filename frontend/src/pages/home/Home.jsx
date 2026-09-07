import React, { useEffect, useState } from 'react'
import Navbar from '../../componet/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../utils/TravelStoryCard'
import { dummyStories } from '../../utils/dummyData'
import { isFavouriteHandler } from './homeApi'

import Modal from "react-modal"

import { ToastContainer, toast } from 'react-toastify';
import { MdAdd } from "react-icons/md";
import AddEditTravelSTrory from './AddEditTravelSTrory'
import ViewTravelStory from './ViewTravelStory'

const Home = () => {

  const [allStories,setAllStories] = useState(dummyStories)

  const [openAddEditModal,setOpenAddEditModal] = useState({
    isShow:false,
    type:"add",
    data:null
  })

  const [openViewModal,setOpenViewModal] = useState({
    isShown:false,
    data:null
  })


console.log("check the open add edit model ==>",openAddEditModal)


 async function getAllStories(){
  try {
    const resp = await axiosInstance.get("/story/get-all-stories")
    if(resp && resp.data.stories){
      setAllStories(resp.data.stories)
    }
  } catch (error) {
    console.log("An unexpected error occurred . Please try again. ==>",error)
  }
  }

  const handleEdit =(data)=>{
    console.log("handle edit function...",data)
    setOpenAddEditModal({isShow:true,type:"edit",data:data})
  }

  const handleViewStroy=(data)=>{
    console.log("handle view story function. data...",data)
    setOpenViewModal({isShown:true,data})
  }

  // toggle the favourite story.
  const updateIsFavourite = async (storyData)=>{
    console.log("update favourite function...")
    try {
      const response = await isFavouriteHandler(storyData)
      if(response && response.story){
        toast.success("Story Update successfully")
        getAllStories()
      }

    } catch (error) {
      console.log("An unexpected error occurred . Please try again.")
    }
  }

  useEffect(()=>{
    getAllStories()
  },[])

  return (
    <div>
      <Navbar/>
      
      <div className='container mx-auto py-10'>
        <div className='flex gap-7'>
          <div className='flex-1'>
            {allStories.length >0 ? (
              <div className='grid grid-cols-2 gap-4'>
                {
                  allStories.map((item)=>{
                    return (
                      <TravelStoryCard key={item._id} 
                        imageUrl={item.imageUrl}
                        title={item.title}
                        story={item.story}
                        date={item.visitedDate}
                        visitedLocation={item.visitedLocation}
                        isFavourite ={item.isFavourite}
                        onEdit={()=>handleEdit(item)}
                        onClick={()=>handleViewStroy(item)}
                        onFavouriteClick ={()=>updateIsFavourite(item)}
                      />
                    )
                  })
                }

            </div>) : 
            (<>Empty Card here. </>) }
          </div>
          <div className='w-[320px]'></div>
        </div>

      </div>


        {/* add and edit travel story model */}
        <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={()=>{}}
        style={{
          overlay:{
            backgroundColor :"rgba(0,0,0,0.2",
            zIndex:999
          }
        }}
        className="model-box"
        >
          <AddEditTravelSTrory  type={openAddEditModal.type} storyInfo={openAddEditModal.data} onClose={()=>{setOpenAddEditModal({isShow:false,type:"add",data:null})}} getAllTRavelStories={getAllStories} />
          
        </Modal>    

        {/* view travel story model */}
        
        <Modal
         isOpen={openViewModal.isShown}
         onRequestClose={()=>{}}
          style={{
          overlay:{
            backgroundColor :"rgba(0,0,0,0.2",
            zIndex:999
          }
        }}
        className="model-box"
        >
          <ViewTravelStory  storyInfo={openViewModal.data || null}
           onClose={()=>{setOpenViewModal((prevState)=>({...prevState,isShown:false}))}}
           onDeleteClick={()=>{
            
           }} 

          onEditClick={()=>{
            setOpenViewModal((prevState)=>({...prevState,isShown:false}))
            handleEdit(openViewModal.data || null)
          }} />
        </Modal>

        

        <button className='w-16 h-16 flex items-center justify-center rounded-full bg-cyan-400 hover:bg-cyan-600 fixed right-10 bottom-10  '  onClick={()=>{setOpenAddEditModal({isShow:true,type:"add",data:null})}} >
          <MdAdd className="text-[32px] text-gray-600  " />
        </button>

       <ToastContainer />
      </div>
  )
}

export default Home