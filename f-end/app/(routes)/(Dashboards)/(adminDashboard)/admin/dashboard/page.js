"use client";
import AllArticles from "@/app/_Components/_AdminDashboard/AllArticles";
import DashboardInfoCard from "@/app/_Components/_AdminDashboard/DashboardInfoCard";
import FilteringTag from "@/app/_Components/_AdminDashboard/FilteringTag";
import MainContentWrapper from "@/app/_Components/_AdminDashboard/MainContentWrapper";
import { SearchBar } from "@/app/_Components/_AdminDashboard/SearchBar";
import MonthlyFilter from "@/app/_Components/_Blog/_BlogPage/MonthlyFilter";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
const page = () => {
  const router = useRouter();
  const path = usePathname();
  // console.log(path.split('/'))
  return (
    <MainContentWrapper>
      {/* info (Stats) Cards */}
      <div className="flex flex-wrap max-[500px]:flex-nowrap gap-2 justify-around ">
        <DashboardInfoCard title={"Total Article Published"} counts={"23"} />
        <DashboardInfoCard title={"Total Tags"} counts={"23"} />
        <DashboardInfoCard title={"Total Editors"} counts={"23"} />
      </div>
      {/* show all article */}
      <div className="mt-7">
        {/* filtering menu */}
        <div className="flex flex-col justify-end flex-wrap gap-2 max-[400px]:justify-center">
          {/* filter by Tag/Month*/}
          {/* <div className="flex gap-2 items-center z-10"> */}
          {/* <FilteringTag tagName="Tags" /> */}
          {/* <input
              type="date"
              className="!w-[55px] rounded-[100px] outline-none focus:outline-none border-[1.5px] border-[black] py-1 px-4 bg-blur-white hover:bg-[#ffffffcc]"
              title="Filter by Month"
            /> */}
          <MonthlyFilter filterFor={"dashboard"}>
            {/* </div> */}
            {/* filter by search Component*/}
            {/* <div> */}
            {/* <SearchBar /> */}
            {/* </div> */}
            {/* all articles */}
            <AllArticles />
          </MonthlyFilter>
        </div>
      </div>
    </MainContentWrapper>
  );
};
{
}

export default page;
