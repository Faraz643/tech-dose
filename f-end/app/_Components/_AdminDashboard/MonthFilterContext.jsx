"use client";

import React, { createContext, useContext, useState } from "react";

export const MonthlyFilterContext = createContext("Select Month");

const MonthlyFilterContextProvider = ({ children }) => {
  const [filteredMonth, setFilteredMonth] = useState("Show All");
  return (
    <MonthlyFilterContext.Provider value={{ filteredMonth, setFilteredMonth }}>
      {children}
    </MonthlyFilterContext.Provider>
  );
};

export function useMonthlyFilterContext() {
  return useContext(MonthlyFilterContext);
}

export default MonthlyFilterContextProvider;
