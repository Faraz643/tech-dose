"use client";
import Image from "next/image";
import React, { useState } from "react";
import Arrow from "../_Blog/_BlogPage/Arrow";
import { categories } from "@/app/(routes)/(blog)/utils";
import { useCategoryFilterContext } from "./CategoryFilterContexts";

const CategoryFilter = ({ children, filterFor }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [monthOptions, setmonthOptions] = useState(false);
  // const [filteredMonth, setFilteredMonth] = useState("Articles"); // Replace this with Context
  const { category, setCategory } = useCategoryFilterContext();
  const handleFilterOpen = () => {
    if (filterOpen) {
      setFilterOpen(false);
      setmonthOptions(false);
    } else {
      setFilterOpen(true);
      setmonthOptions(true);
    }
  };
  const handleMonthButtonClick = (category) => {
    setFilteredMonth(category);
  };
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
            {`${category} `}
            {filterOpen ? <Arrow rotate={true} /> : <Arrow />}
          </button>
          <div
            className={`absolute w-full rounded-[10px] bg-[#e0e1e2]  h-auto flex-col self-start justify-self-start top-12 p-2 duration-300 ${monthOptions ? "flex" : "hidden"}`}
          >
            {categories.map((element) => (
              <button
                key={element.id}
                className="text-left p-1 px-3 hover:bg-[#a0a09eab] rounded-[10px] duration-100 "
                value={element.category}
                onClick={() => setCategory(element.category)}
              >
                {element.category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
