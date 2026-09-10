import React from 'react'
import moment from "moment"
import { GrMapLocation } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";

const TravelStoryCard = ({
  imageUrl,title,story,date,visitedLocation,isFavourite,onClick,onFavouriteClick
}) => {
  return (
    <div className=' border rounded-lg overflow-hidden bg-white hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer '>

      <img src={imageUrl} alt={title || "story_image"} className='w-full h-56 object-cover rounded-lg' />

     <button
  className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-lg border border-gray-400 absolute top-4 right-3"
  onClick={onFavouriteClick}
>
  <FaHeart
    className={`icon-btn ${
      isFavourite
        ? "text-red-500 hover:text-white"
        : "text-white hover:text-red-500"
    }`}
  />
</button>

      <div className='p-4 ' onClick={onClick} >
        <div className='flex items-centergap-3'>
          <div className='flex-1'>
            <h6 className='text-sm font-medium  '>{title}</h6>
            <span> {date ? moment(date).format("Do MMM YYYY") :"_" } </span>
          </div>
        </div>

       
          <p className='text-xs text-slate-600 mt-3 '>{story?.slice(0,60)} </p>
        
        <div className='inline-flex text-slate-800 gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-3 py-2'>
          <GrMapLocation className='text-sm' />
          {visitedLocation.map((item,index)=> visitedLocation.length == index+1 ? `${item},`:`${item}` )  }
        </div>

      </div>


    </div>
  )
}

export default TravelStoryCard