"use client";
import ArticleCard from "@/app/_Components/_Blog/_BlogPage/ArticleCard";
import ArticleAuthorName from "@/app/_Components/_Blog/_SingleArticle/ArticleAuthorName";
import ArticleContent from "@/app/_Components/_Blog/_SingleArticle/ArticleContent";
import ArticleThumbnail from "@/app/_Components/_Blog/_SingleArticle/ArticleThumbnail";
import ArticleTitle from "@/app/_Components/_Blog/_SingleArticle/ArticleTitle";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
export const SingleArticleContext = createContext({});

export default function SingleArticlePage() {
  const router = useRouter();
  const [articleDetails, setArticleDetails] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState('skeleton')
  const params = useParams();
  const slug = useParams().slug;
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/article/${slug}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const result = await response.json();
          setArticleDetails(result.articleData[0]);
          setPlaceholder('')
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.log("An error occured:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
        setPlaceholder('')
      }
    };
    fetchArticle();
  }, []);
  // const onModalClose = () => {
  //   router.back();
  // };

  return (
    <SingleArticleContext.Provider value={{ articleDetails }}>
      <div className="text-center p-4">
        <h1 className="font-futureEarth text-3xl text-black">tech-dose/blog</h1>
      </div>
      
        <div className="flex justify-center p-4 h-auto">
          <div className="max-w-[1200px] p-2 bg-[#201F1E] rounded-[23px] max-[1440px]:w-[100%] max-[2000px]:w-[1200px]">
            <div className="single-article-wrapper bg-[#f6c79700] w-full">
              <ArticleTitle titleFor={placeholder} />
              <div className="flex justify-between flex-wrap mt-14 gap-10 max-[1220px]:justify-center">
                <div className="max-[1220px]:order-2 w-[600px]">
                  <ArticleContent contentFor={placeholder}/>
                </div>
                <div className="single-page-article-thumbnail">
                  <ArticleThumbnail thumbnailFor={placeholder}/>
                </div>
              </div>
              <div className="p-4">
                <ArticleAuthorName authorFor={placeholder}/>
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
    </SingleArticleContext.Provider>
  );
}
