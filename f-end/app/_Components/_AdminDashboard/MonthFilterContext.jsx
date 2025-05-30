"use client";

import { useParams, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

export const MonthlyFilterContext = createContext("Select Month");

const currentDate = new Date();
const monthName = currentDate.toLocaleString("default", { month: "long" }); // Returns the month name in full

const currentYear = new Date().getFullYear();
// localStorage.setItem("MonthF", monthName);
// localStorage.setItem("YearF", currentYear);

const MonthlyFilterContextProvider = ({ children }) => {
  const params = useSearchParams();
  const prevMonthQuery = params.get("month");
  const prevYearQuery = params.get("year");

  const selectedMonth = prevMonthQuery != null ? prevMonthQuery : monthName;
  localStorage.setItem("MonthF", selectedMonth);

  const selectedYear = prevYearQuery != null ? prevYearQuery : currentYear;
  localStorage.setItem("YearF", selectedYear);

  const [filteredMonth, setFilteredMonth] = useState(
    selectedMonth || monthName
  );
  const [filteredYear, setFilteredYear] = useState(selectedYear || currentYear);

  return (
    <MonthlyFilterContext.Provider
      value={{ filteredMonth, setFilteredMonth, filteredYear, setFilteredYear }}
    >
      {children}
    </MonthlyFilterContext.Provider>
  );
};

export function useMonthlyFilterContext() {
  return useContext(MonthlyFilterContext);
}

export default MonthlyFilterContextProvider;
