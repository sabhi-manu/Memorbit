import moment from "moment";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

const FilterInfoTitle = ({ filterType, filterDate, onClear,searchQuery }) => {
  console.log("check the filter type component data ==>", filterType);


  const DateRangeChip = ({date})=>{
console.log("check the date function ==>",date)
const startDate = date?.from ? moment(date?.from).format("Do MMM YYYY"):"N/A"
const endDate = date?.to ? moment(date?.to).format("Do MMM YYYY"):"N/A"

return (
    <div className="flex items-center gap-2 bg-slate-300 px-3 py-2 rounded ">
        <p className="text-xs font-medium" >{startDate} - {endDate} </p>
        <button onClick={onClear}>
            <MdOutlineClose />
        </button>
    </div>
)
  }



  return (
   filterType && ( <div className="mb-5">
      {filterType == "search" ? (
        <h3 className="text-lg font-medium">Search Result - {searchQuery} </h3>
      ) : (
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium ">Travel Stories From </h3>
          <DateRangeChip date={filterDate} />
        </div>
      )}
    </div>)
  );
};

export default FilterInfoTitle;
