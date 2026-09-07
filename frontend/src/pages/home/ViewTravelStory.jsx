import moment from "moment";
import React from "react";
import { GrMapLocation } from "react-icons/gr";
import {
  MdClose,
  MdUpdate,
  MdDeleteOutline,
  MdCalendarToday,
} from "react-icons/md";

const ViewTravelStory = ({
  onClose,
  storyInfo,
  onDeleteClick,
  onEditClick,
}) => {
  if (!storyInfo) return null;

  return (
    <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-end gap-3 px-6 pt-5">
        {/* Update */}
        <button
          className="flex items-center gap-2 px-5 py-3 rounded-full
                     bg-cyan-100 text-cyan-600
                     hover:bg-cyan-200 transition-all duration-200"
          onClick={onEditClick}
        >
          <MdUpdate className="text-sm" />
          <span className="font-medium text-sm">UPDATE STORY</span>
        </button>

        {/* Delete */}
        <button
          className="flex items-center gap-2 px-5 py-3 rounded-full
                     bg-red-100 text-red-500
                     hover:bg-red-200 transition-all duration-200"
          onClick={onDeleteClick}
        >
          <MdDeleteOutline className="text-xl" />
          <span className="font-medium text-sm">DELETE</span>
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="p-2 ml-1 rounded-full hover:bg-slate-100 transition"
        >
          <MdClose className="text-3xl text-slate-500" />
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-8 pb-8 pt-4">
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-5">
          {storyInfo.title}
        </h1>

        {/* Date + Location */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Date */}
          <div className="flex items-center gap-2 text-slate-500">
            <MdCalendarToday className="text-xl" />

            <span className="text-sm font-medium">
              {moment(storyInfo.visitedDate).format("Do MMM YYYY")}
            </span>
          </div>

          {/* Location */}
          <div
            className="inline-flex items-center gap-2 flex-wrap
                bg-cyan-100 text-cyan-600
                px-4 py-2 rounded-full"
          >
            <GrMapLocation className="text-base shrink-0" />

            <div className="flex items-center flex-wrap">
              {storyInfo.visitedLocation?.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="text-sm font-medium">{item}</span>

                  {index !== storyInfo.visitedLocation.length - 1 && (
                    <span className="mx-1 text-cyan-400">,</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ================= IMAGE ================= */}
        <div className="w-full h-[300px] md:h-[430px] rounded-xl overflow-hidden mb-6">
          <img
            src={storyInfo.imageUrl}
            alt={storyInfo.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ================= STORY ================= */}
        <p className="text-lg md:text-xl leading-8 text-slate-700">
          {storyInfo.story}
        </p>
      </div>
    </div>
  );
};

export default ViewTravelStory;
