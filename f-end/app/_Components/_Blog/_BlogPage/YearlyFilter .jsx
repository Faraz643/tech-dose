"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Arrow from "./Arrow";
import { years } from "@/app/(routes)/(blog)/utils";
import {
  MonthlyFilterContext,
  useMonthlyFilterContext,
} from "@/app/_Components/_AdminDashboard/MonthFilterContext";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

const YearlyFilter = ({ children, filterFor }) => {
  const { filteredYear, setFilteredYear } = useMonthlyFilterContext();
  const [filterOpen, setFilterOpen] = useState(false);
  const [monthOptions, setmonthOptions] = useState(false);

  const router = useRouter();

  const pathname = usePathname();
  const params = useSearchParams();
  const monthParamExist = params.get("month");
  // console.log("this is pathname", pathname);
  // const [filteredMonth, setFilteredMonth] = useState('Show All')
  const handleFilterOpen = () => {
    if (filterOpen) {
      setFilterOpen(false);
      setmonthOptions(false);
    } else {
      setFilterOpen(true);
      setmonthOptions(true);
    }
  };
  const handleMonthButtonClick = (year) => {
    setFilteredYear(year);
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
            {`${filteredYear} `}
            {filterOpen ? <Arrow rotate={true} /> : <Arrow />}
          </button>
          <div
            className={`absolute w-full rounded-[10px] bg-[#e0e1e2]  h-auto flex-col self-start justify-self-start top-12 p-2 duration-300 ${monthOptions ? "flex" : "hidden"}`}
          >
            {years.map((element) => (
              <button
                key={element.id}
                className="text-left p-1 px-3 hover:bg-[#a0a09eab] rounded-[10px] duration-100"
                value={element.year}
                onClick={() => {
                  setFilteredYear(element.year);
                  localStorage.setItem("YearF", element.year);

                  const query = new URLSearchParams();
                  query.set("year", element.year);

                  if (monthParamExist != null) {
                    query.set("month", monthParamExist);
                  }

                  router.push(`${pathname}?${query.toString()}`);
                }}
              >
                {element.year}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* {children && React.Children.map(children, child => React.cloneElement(child, { filteredMonth }))
        } */}
    </>
  );
};

export default YearlyFilter;
