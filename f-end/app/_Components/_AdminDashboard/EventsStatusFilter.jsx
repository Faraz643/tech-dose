"use client";
import Image from "next/image";
import React, { useState } from "react";
import Arrow from "../_Blog/_BlogPage/Arrow";
import { categories, eventStatus } from "@/app/(routes)/(blog)/utils";
import { useCategoryFilterContext } from "./CategoryFilterContexts";

const EventStatusFilter = ({ children, filterFor }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [monthOptions, setmonthOptions] = useState(false);
  // const [filteredMonth, setFilteredMonth] = useState("Articles"); // Replace this with Context
  const { eventStatusFilter, setEventStatusFilter } =
    useCategoryFilterContext();
  const handleFilterOpen = () => {
    if (filterOpen) {
      setFilterOpen(false);
      setmonthOptions(false);
    } else {
      setFilterOpen(true);
      setmonthOptions(true);
    }
  };
  //   const handleMonthButtonClick = (category) => {
  //     setFilteredMonth(category);
  //   };
  //   console.log(eventStatus);
  return (
    <>
      <div
        className={`flex justify-end ${filterFor === "dashboard" ? "p-1" : "p-2"} z-[2]`}
      >
        <div className=" relative">
          <button
            className={`flex justify-between items-center w-[150px] ${filterFor === "dashboard" ? "bg-[#ffffff64]" : "bg-[#C8CCCF]"}   p-2 font-bold rounded-[10px] active:border-[#33323290] active:border-[2px] duration-100`}
            onClick={handleFilterOpen}
          >
            {`${eventStatusFilter} `}

            {filterOpen ? <Arrow rotate={true} /> : <Arrow />}
          </button>
          <div
            className={`absolute w-full rounded-[10px] bg-[#e0e1e2]  h-auto flex-col self-start justify-self-start top-12 p-2 duration-300 ${monthOptions ? "flex" : "hidden"}`}
          >
            {eventStatus.map((element) => (
              <button
                key={element.id}
                className="text-left p-1 px-3 hover:bg-[#a0a09eab] rounded-[10px] duration-100 "
                value={element.status}
                onClick={() => {
                  setEventStatusFilter(element.status);
                }}
              >
                {element.status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventStatusFilter;
