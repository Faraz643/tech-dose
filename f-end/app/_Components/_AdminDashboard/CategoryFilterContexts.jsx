"use client";
import React, { createContext, useContext, useState } from "react";

export const CategoryFilterContext = createContext();

const CategoryFilterContextProvider = ({ children }) => {
  const [category, setCategory] = useState("Articles");
  const [eventStatusFilter, setEventStatusFilter] = useState("Show All");
  return (
    <CategoryFilterContext.Provider
      value={{ category, setCategory, eventStatusFilter, setEventStatusFilter }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};

export function useCategoryFilterContext() {
  return useContext(CategoryFilterContext);
}

export default CategoryFilterContextProvider;
