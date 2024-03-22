"use client";
import { articleDetails } from "@/app/(routes)/(blog)/utils";
import ArticleModal from "@/app/_Components/_Blog/_SingleArticle/ArticleModal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Children, createContext, useContext, useEffect, useState } from "react";

const ArticleDetails = createContext({});

const ArticleDetailsContext = ({children}) => {
  const [articleDetails, setArticleDetails] = useState({});
  const pageHistory = useRouter();
  const params = useParams();
  const slug = params.slug; // write logic here fetch data with params.slug
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/article/${slug}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        console.log(result[0]);
        setArticleDetails(result[0]);
      } catch (err) {
        console.log("An error occured:", err);
      }
    };
    fetchArticle();
  }, []);

 
  const onModalClose = () => {
    pageHistory.back();
  };

  return (
    <ArticleDetails.Provider value={{ articleDetails, onModalClose }}>
      {children}
    </ArticleDetails.Provider>
  );
};

export {ArticleDetailsContext, ArticleDetails}
