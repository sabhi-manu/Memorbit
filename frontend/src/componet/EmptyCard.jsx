import React from "react";
import { MdOutlineTravelExplore } from "react-icons/md";

const EmptyCard = ({ message }) => {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center px-6">
      {/* Icon */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-cyan-100 mb-5">
        <MdOutlineTravelExplore className="text-5xl text-cyan-500" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-slate-700">
        No Travel Stories Yet
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-slate-500 leading-6">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
