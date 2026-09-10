import React, { useEffect, useState } from "react";
import Navbar from "../../componet/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../utils/TravelStoryCard";
import { dummyStories } from "../../utils/dummyData";
import { isFavouriteHandler } from "./homeApi";

import Modal from "react-modal";

// import { ToastContainer, toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import AddEditTravelSTrory from "./AddEditTravelSTrory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../componet/EmptyCard";
import { DayPicker } from "@daypicker/react";
import moment from "moment";
import FilterInfoTitle from "../../componet/FilterInfoTitle";
import { getEmptyCardMessage } from "../../utils/helper";
import { UseAuth } from "../../context/authContext";
import {toast} from "react-toastify"

const Home = () => {
  const [allStories, setAllStories] = useState(dummyStories);
  const {user} = UseAuth()
  // console.log('check the user in home page ==>',user)

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });

  const [searchFilterType, setSearchFilterType] = useState("");

  // console.log("check the open add edit model ==>", openAddEditModal);

  async function getAllStories() {
    try {
      const resp = await axiosInstance.get("/story/get-all-stories");
      console.log("get all stories ==>",resp.data)
      if (resp && resp.data.stories) {
        setAllStories(resp.data.stories);
      }
    } catch (error) {
      console.log(
        "An unexpected error occurred . Please try again. ==>",
        error,
      );
    }
  }

  const handleEdit = (data) => {
    // console.log("handle edit function...", data);
    setOpenAddEditModal({ isShow: true, type: "edit", data: data });
  };

  const handleViewStroy = (data) => {
    // console.log("handle view story function. data...", data);
    setOpenViewModal({ isShown: true, data });
  };

  // toggle the favourite story.
  const updateIsFavourite = async (storyData) => {
    // console.log("update favourite function...");
    try {
      const response = await isFavouriteHandler(storyData);
      console.log("check the response of favourite toggle ==>",response)
      if (response && response.story) {
        toast.success("Story Update successfully");
        getAllStories();
      }
    } catch (error) {
      console.log("An unexpected error occurred . Please try again.");
    }
  };

  const deleteTravelStory = async (data) => {
    const storyId = data._id;
    try {
      const response = await axiosInstance.delete(`story/delete-story/${storyId}`);

      if (response.status == 200) {
        toast.success("Story deleted successfully");
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllStories();
      }
    } catch (error) {
      console.log("Error deleting story:", error);

      toast.error("Unable to delete story");
    }
  };

  const onSearchStory = async (search) => {
    setSearchFilterType("search");
    try {
      const response = await axiosInstance.get("/story/search", {
        params: {
          query: search,
        },
      });
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occurred . Please try again.");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    getAllStories();
    setSearchFilterType("");
  };

  const handleDateSelect = (range) => {
    setDateRange(range);
    getStoriesByDateRange(range);
  };

  const getStoriesByDateRange = async (range) => {
    try {
      const startDate = range.from ? moment(range.from).valueOf() : null;
      const endDate = range.to ? moment(range.to).valueOf() : null;

      setSearchFilterType("date");
      if (startDate && endDate) {
        const response = await axiosInstance.get(
          "/story/travel-stories/filter",
          {
            params: { startDate, endDate },
          },
        );

        if (response.data && response.data.stories) {
          setAllStories(response.data.stories);
        }
      }
    } catch (error) {
      console.log("An unexpected error occurred . Please try again.");
    }
  };

  const resetFilter = () => {
    // console.log("clear search filter function ==>");
    setSearchFilterType("");
    setSearchQuery("");
    setDateRange({ from: null, to: null });
  };

  useEffect(() => {
    getAllStories();
  }, []);

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchStory={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto py-10">
        <FilterInfoTitle
          filterType={searchFilterType}
          filterDate={dateRange}
          searchQuery={searchQuery}
          onClear={() => {
            resetFilter();
          }}
        />

        <div className="flex gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return (
                    <TravelStoryCard
                      key={item._id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavourite={item.isFavourite}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewStroy(item)}
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <>
                {" "}
                <EmptyCard
                  message={getEmptyCardMessage(searchFilterType)}
                />{" "}
              </>
            )}
          </div>
          <div className="w-[320px]">
            <div className="bgpwhite border border-slate-300 shadow-lg shadow-slate-200 rounded-lg ">
              <div className="p-3">
                <DayPicker
                  mode="range"
                  captionLayout="dropdown-button"
                  selected={dateRange}
                  onSelect={handleDateSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add and edit travel story model */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2",
            zIndex: 999,
          },
        }}
        className="model-box"
      >
        <AddEditTravelSTrory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", data: null });
          }}
          getAllTRavelStories={getAllStories}
        />
      </Modal>

      {/* view travel story model */}

      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null);
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-400 hover:bg-cyan-600 fixed right-10 bottom-10  "
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-gray-600  " />
      </button>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default Home;
