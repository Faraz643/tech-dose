"use client";

import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import useFetchArticles from "@/app/(routes)/(blog)/useFetchArticles";
import {
  MonthlyFilterContext,
  useMonthlyFilterContext,
} from "@/app/_Components/_AdminDashboard/MonthFilterContext";

const AllArticles = () => {
  const { filteredMonth } = useMonthlyFilterContext();

  const [articleDeleted, setArticleDeleted] = useState(true);
  const { allArticles, fetchData } = useFetchArticles();
  useEffect(() => {
    fetchData();
  }, [articleDeleted]);

  const monthfromLocal = localStorage.getItem("MonthF");
  const YearfromLocal = localStorage.getItem("YearF");

  // const filteredArticles =
  //   filteredMonth === "Show All"
  //     ? allArticles
  //     : allArticles.filter((article) => article.month === filteredMonth);

  const filteredArticles =
    monthfromLocal === "Show All"
      ? allArticles.filter((article) => article.year === YearfromLocal)
      : allArticles.filter(
          (article) =>
            article.month === monthfromLocal && article.year === YearfromLocal
        );

  return (
    <div className="bg-blur min-h-[300px] mt-3 rounded-[25px] !border-white flex gap-5 p-3 flex-wrap justify-center ">
      {filteredArticles.map((article, index) => (
        <ArticleCard
          articleDetails={article}
          onDelete={setArticleDeleted}
          key={index}
        />
      ))}
    </div>
  );
};

export default AllArticles;
