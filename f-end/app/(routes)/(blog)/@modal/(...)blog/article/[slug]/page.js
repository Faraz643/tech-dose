"use client";
import ArticleModal from "@/app/_Components/_Blog/_SingleArticle/ArticleModal";
import { useParams } from "next/navigation";
import React, { createContext, useContext } from "react";


export const SlugDetails = createContext();

const Page = () => {
  const params = useParams();
  const articleDetails = params.slug;
  // context that will provide the fetched article details in all of its' children
  // > ArticleModal_c(provide SlugDetails context for its children component as articleDetails) > ArticleContentBox_C > Thumbnail_C+CloseButton_C+EditorName_C+ArticleContent_C

  return (
    <SlugDetails.Provider value={articleDetails}>
      <ArticleModal />
    </SlugDetails.Provider>
  );
};

export default Page;
