import Image from "next/image";
import "../blog/styles.css";
import MonthlyFilter from "@/app/_Components/_Blog/_BlogPage/MonthlyFilter";
import ArticleCard from "@/app/_Components/_Blog/_BlogPage/ArticleCard";
export default function BlogPage() {
  return (
    <div className="flex justify-center bg-[#ff000000]">
      <div className="w-[1200px] flex justify-center flex-col bg-[#80808000]">
        <div className="flex flex-col items-center justify-center py-4 gap-3">
          <div className="flex justify-center">
            <span className="bg-[#E1FF4A] py-2 px-4 rounded-[100px]">Blog</span>
          </div>
          <div>
            <span className="py-2 px-4 rounded-[100px] text-5xl text-center max-[570px]:text-3xl">
              Latest News
            </span>
          </div>
          <div className="text-2xl text-center w-[700px] px-7 max-[570px]:w-[auto] max-[570px]:text-[1.2rem]">
            <p className="text-[#585454] ">
              Stay Updated with latest trends, tips, and insights in web design
              through our informative and inspiring tech magazine.
            </p>
          </div>
        </div>
        <MonthlyFilter />
        <ArticleCard/>
        
      </div>
    </div>
  );
}
