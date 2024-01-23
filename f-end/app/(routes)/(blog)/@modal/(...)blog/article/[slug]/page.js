"use client";
import ArticleModal from "@/app/_Components/_Blog/_SingleArticle/ArticleModal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";

export const SlugDetails = createContext();

const Page = () => {
  const pageHistory = useRouter();
  const params = useParams();
  const articleDetails = params.slug; // write logic here fetch data with params.slug
  // articleDetails.thumbnails
  // articleDetails.title
  // articleDetails.author_name
  // articleDetails.content
  const onModalClose = () => {
    pageHistory.back();
  };

  return (
    <SlugDetails.Provider value={{ articleDetails, onModalClose }}>
      <ArticleModal />
    </SlugDetails.Provider>
  );
};

export default Page;
