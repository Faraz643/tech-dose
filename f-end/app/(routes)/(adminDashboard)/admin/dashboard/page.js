"use client";

import AllArticles from "@/app/_Components/_AdminDashboard/AllArticles";
import DashboardInfoCard from "@/app/_Components/_AdminDashboard/DashboardInfoCard";
import FilteringTag from "@/app/_Components/_AdminDashboard/FilteringTag";
import { SearchBar } from "@/app/_Components/_AdminDashboard/SearchBar";
import React from "react";

const page = () => {
  return (
    <main className="bg-blur flex-1 rounded-[25px] p-5">
      {/* info (Stats) Cards */}
      <div className="flex flex-wrap max-[500px]:flex-nowrap gap-2 justify-around ">
        <DashboardInfoCard title={"Total Article Published"} counts={"23"} />
        <DashboardInfoCard title={"Total Tags"} counts={"23"} />
        <DashboardInfoCard title={"Total Editors"} counts={"23"} />
      </div>
      {/* show all article */}
      <div className="mt-7">
        {/* filtering menu */}
        <div className="flex justify-between">
          {/* filter by Tag/Month*/}
          <div className="flex gap-2 items-center z-10">
            <FilteringTag tagName="Tags" />
            <input
              type="date"
              className="rounded-[100px] outline-none focus:outline-none border-[1.5px] border-[black] py-1 px-4 bg-blur-white hover:bg-[#ffffffcc]"
            placeholder="Month"/>
          </div>
          {/* filter by search Component*/}
          <div>
            <SearchBar />
          </div>
        </div>
        {/* all articles */}
        <AllArticles/>
        
      </div>
    </main>
  );
};

export default page;
