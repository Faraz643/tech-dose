// "use client";
import ArticleCard from "@/app/_Components/_Blog/_BlogPage/ArticleCard";
import { ArticleDetailsContext } from "@/app/_Components/_Blog/_BlogPage/InterceptionContext";
import ArticleAuthorName from "@/app/_Components/_Blog/_SingleArticle/ArticleAuthorName";
import ArticleContent from "@/app/_Components/_Blog/_SingleArticle/ArticleContent";
import ArticleThumbnail from "@/app/_Components/_Blog/_SingleArticle/ArticleThumbnail";
import ArticleTitle from "@/app/_Components/_Blog/_SingleArticle/ArticleTitle";
import { downArrow } from "@/public/assets/_index";
import Image from "next/image";

export default function Home() {
  
  return (
    <ArticleDetailsContext>
      <div className="text-center p-4">
        <h1 className="font-futureEarth text-3xl text-black">tech-dose/blog</h1>
      </div>
      <div className="flex justify-center p-4 h-auto">
        <div className="max-w-[1200px] p-2 bg-[#201F1E] rounded-[23px] max-[1440px]:w-[100%] max-[2000px]:w-[1200px]">
          <div className="single-article-wrapper bg-[#f6c79700] w-full">
            <ArticleTitle />
            <div className="flex justify-between flex-wrap mt-14 gap-10 max-[1220px]:justify-center">
              <div className="max-[1220px]:order-2 w-[600px]">
                <ArticleContent />
              </div>
              <div className="single-page-article-thumbnail">
                <ArticleThumbnail />
              </div>
            </div>
            <div className="p-4">
              <ArticleAuthorName />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-3xl my-10 marquee ">
        <p>
          More from {`this month`}. Stay updated with our latest tech news 👇
        </p>
      </div>
      {/* implement logic to render articles based fetched on the currently fetched article's month */}
      <ArticleCard />
    </ArticleDetailsContext>
  );
}
