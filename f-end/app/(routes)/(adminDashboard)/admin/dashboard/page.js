"use client";

import DashboardInfoCard from "@/app/_Components/_AdminDashboard/DashboardInfoCard";
import FilteringTag from "@/app/_Components/_AdminDashboard/FilteringTag";
import { SearchBar } from "@/app/_Components/_AdminDashboard/SearchBar";
import React from "react";

const page = () => {
  return (
    <main className="bg-blur flex-1 rounded-[25px] p-5">
      {/* info (Stats) Cards */}
      <div className="flex flex-wrap gap-2 justify-between ">
        <DashboardInfoCard title={"Total Article Published"} counts={"23"} />
        <DashboardInfoCard title={"Total Tags"} counts={"23"} />
        <DashboardInfoCard title={"Total Editors"} counts={"23"} />
      </div>
      {/* show all article */}
      <div className="mt-7">
        {/* filtering menu */}
        <div className="flex justify-between">
          {/* filter by choice Component*/}
          <div className="flex gap-2 items-center">
            <FilteringTag tagName={"Tags"} />
            {/* <FilteringTag tagName={"Month"} /> */}
            <input type="date" className="rounded-[100px]  outline-none focus:outline-none border-[1.5px] border-[black] py-1 px-4" />
          </div>
          {/* filter by search Component*/}
          <div>
            <SearchBar />
          </div>
        </div>
        {/* all articles */}
        <div></div>
      </div>
    </main>
  );
};

export default page;
