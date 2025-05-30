"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Arrow from "./Arrow";
import { months } from "@/app/(routes)/(blog)/utils";
import {
  MonthlyFilterContext,
  useMonthlyFilterContext,
} from "@/app/_Components/_AdminDashboard/MonthFilterContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
useMonthlyFilterContext;

const MonthlyFilter = ({ children, filterFor }) => {
  const { filteredMonth, setFilteredMonth } = useMonthlyFilterContext();
  const [filterOpen, setFilterOpen] = useState(false);
  const [monthOptions, setmonthOptions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const yearParamExist = params.get("year");

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
  const handleMonthButtonClick = (month) => {
    setFilteredMonth(month);
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
            {`${filteredMonth} `}
            {filterOpen ? <Arrow rotate={true} /> : <Arrow />}
          </button>
          <div
            className={`absolute w-full rounded-[10px] bg-[#e0e1e2]  h-auto flex-col self-start justify-self-start top-12 p-2 duration-300 ${monthOptions ? "flex" : "hidden"}`}
          >
            {months.map((element) => (
              <button
                key={element.id}
                className="text-left p-1 px-3 hover:bg-[#a0a09eab] rounded-[10px] duration-100 "
                value={element.month}
                // onClick={() => setFilteredMonth(element.month)}

                onClick={() => {
                  localStorage.setItem('MonthF', element.month)
                  setFilteredMonth(element.month);

                  const query = new URLSearchParams();
                  if (yearParamExist != null) {
                    query.set("year", yearParamExist);
                  }
                  query.set("month", element.month);

                  router.push(`${pathname}?${query.toString()}`);
                }}
              >
                {element.month}
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

export default MonthlyFilter;
