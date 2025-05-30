"use client";
import AllArticles from "@/app/_Components/_AdminDashboard/AllArticles";
import DashboardInfoCard from "@/app/_Components/_AdminDashboard/DashboardInfoCard";
import FilteringTag from "@/app/_Components/_AdminDashboard/FilteringTag";
import MainContentWrapper from "@/app/_Components/_AdminDashboard/MainContentWrapper";
import MonthlyFilterContextProvider from "@/app/_Components/_AdminDashboard/MonthFilterContext";
import { SearchBar } from "@/app/_Components/_AdminDashboard/SearchBar";
import CategoryFilter from "@/app/_Components/_AdminDashboard/CategoryFilter";
import MonthlyFilter from "@/app/_Components/_Blog/_BlogPage/MonthlyFilter";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useCategoryFilterContext } from "@/app/_Components/_AdminDashboard/CategoryFilterContexts";
import AllEvents from "@/app/_Components/_AdminDashboard/AllEvents";
import EventStatusFilter from "@/app/_Components/_AdminDashboard/EventsStatusFilter"
import YearlyFilter from "@/app/_Components/_Blog/_BlogPage/YearlyFilter ";
const Page = () => {
  const { category, setCategory } = useCategoryFilterContext();
  const router = useRouter();
  const path = usePathname();

  function showContentOnCondition() {
    if (category === "Articles") {
      return (
        <div className="flex flex-col justify-end flex-wrap gap-2 max-[400px]:justify-center">
          <div className="flex justify-between flex-wrap">
            <CategoryFilter filterFor={"dashboard"} />
            <MonthlyFilter filterFor={"dashboard"} />
            <YearlyFilter filterFor={"dashboard"} />
          </div>
          <AllArticles />
        </div>
      );
    } else if (category === "Events") {
      return (
        <div className="flex flex-col justify-end flex-wrap gap-2 max-[400px]:justify-center">
          <div className="flex justify-between flex-wrap">
            <CategoryFilter filterFor={"dashboard"} />
            {/* <MonthlyFilter filterFor={"dashboard"} /> */}
            <EventStatusFilter filterFor={"dashboard"}/>
          </div>
          <AllEvents />
        </div>
      );
    }else{
      return (
        <div className="flex flex-col justify-end flex-wrap gap-2 max-[400px]:justify-center">
          <div className="flex justify-between flex-wrap">
            <CategoryFilter filterFor={"dashboard"} />
            <MonthlyFilter filterFor={"dashboard"} />
          </div>
        </div>
      );
    }
  }

  return (
    <MonthlyFilterContextProvider>
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
          {showContentOnCondition()}
        </div>  
      </MainContentWrapper>
    </MonthlyFilterContextProvider>
  );
};

export default Page;
