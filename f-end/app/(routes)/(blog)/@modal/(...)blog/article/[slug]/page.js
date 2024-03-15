"use client";
import ArticleModal from "@/app/_Components/_Blog/_SingleArticle/ArticleModal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";

export const SlugDetails = createContext();

// fetch single article through api, get response as json, destructrue article details, send details in value prop of context provider (SlugDetails), get each element and pass as props in their individual component

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
