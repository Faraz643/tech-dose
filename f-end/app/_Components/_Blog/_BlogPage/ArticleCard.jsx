"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { twitterFeedThumbnail } from "@/public/assets/_index";
import { articleDetails } from "@/app/(routes)/(blog)/utils";
import useFetchArticles from "@/app/(routes)/(blog)/useFetchArticles";
import { useMonthlyFilterContext } from "../../_AdminDashboard/MonthFilterContext";
import { useSearchParams } from "next/navigation";

const ArticleCard = () => {
  const { filteredMonth } = useMonthlyFilterContext();
  const { filteredYear } = useMonthlyFilterContext();
  const params = useSearchParams();
  const { allArticles } = useFetchArticles();
  const monthName = params.get("month");

  const thumbnailStyling = {
    backgroundImage: `url('${twitterFeedThumbnail.src}')`,
    backgroundPosition: "center",
    backgroundSize: "230%",
    backgroundRepeat: "no-repeat",
    borderRight: "5px solid #363535",
  };
  const blurStyle = {
    background: "rgba(0,0,0,0.2)",
    // background: 'rgba(255, 255, 255, 0.25)',
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(20px)",
    // -webkit - backdrop - filter: 'blur(16px)',
    borderEadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };

  /*

Only current month and current year relation 
conditions:
1.) if month is Show All, then show all articles of selected year
2.) else filter by year && filter by month

*/

  // const filteredArticles =
  //   filteredMonth === "Show All"
  //     ? allArticles.filter((article) => article.year === filteredYear)
  //     : allArticles.filter(
  //         (article) =>
  //           article.year === filteredYear && article.month === filteredMonth
  //       );

  const monthfromLocal = localStorage.getItem("MonthF");
  const YearfromLocal = localStorage.getItem("YearF");

  
  const filteredArticles =
    monthfromLocal === "Show All"
      ? allArticles.filter((article) => article.year === YearfromLocal)
      : allArticles.filter(
          (article) =>
            article.month === monthfromLocal && article.year === YearfromLocal
        );

  return (
    <div className="p-10 bg-[#00000000] flex justify-center">
      <div className="flex justify-center items-center flex-wrap gap-20 max-[570px]:flex-col max-[570px]:items-center">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/article/${article.slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative w-[300px] h-[300px] rounded-[20px] overflow-hidden">
              <Image
                src={`${article.thumbnail}`}
                fill
                alt="Article Title Thumbnail"
                className="object-cover"
                // objectPosition="center"
                // priority
                // contain
                loading="lazy"
                // quality={1}
                // placeholder="empty"
              />
              <div className="absolute flex flex-col justify-between h-full p-3">
                <span className="text-center bg-[#E1FF4A] rounded-[10px] w-[90px]">
                  {article.month}
                </span>
                <div
                  className="bg-[#ffffff5f] rounded-[10px] p-2"
                  style={blurStyle}
                >
                  <p className="text-[#f4f4f6] text-lg">{article.title}</p>
                </div>
              </div>
            </div>
          </Link>
          // <Link
          //   key={article.id}
          //   href={`/blog/article/${article.slug}`}
          //   target="_blank"
          //   rel="noopener noreferrer"
          //   className="w-[300px] h-[370px]"
          // >
          //   <div
          //     className="relative article-card w-[100%] h-[100%]  border-[#29292800] rounded-[20px] duration-300 hover:!bg-[length:260%]"
          //     style={{
          //       ...thumbnailStyling,
          //       backgroundImage: `url(${article.thumbnail})`,
          //     }}
          //   >
          //     <div className="flex flex-col justify-between h-full p-3">
          //       <span className="text-center bg-[#E1FF4A] rounded-[10px] w-[90px]">
          //         {article.month}
          //       </span>
          //       <div
          //         className="bg-[#ffffff5f] rounded-[10px] p-2"
          //         style={blurStyle}
          //       >
          //         <p className="text-[#f4f4f6] text-lg">{article.title}</p>
          //       </div>
          //     </div>
          //   </div>
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;
