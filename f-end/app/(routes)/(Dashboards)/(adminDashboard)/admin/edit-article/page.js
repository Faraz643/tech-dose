import ArticleForm from "@/app/_Components/_AdminCreatePost/ArticleForm";
import MainContentWrapper from "@/app/_Components/_AdminDashboard/MainContentWrapper";
import React from "react";

const page = () => {
  return (
    <MainContentWrapper>
      <h1 className="text-center text-2xl">Edit Post</h1>
      <div id="form-area">
        <ArticleForm updatingArticleSlug={"mew-postss"} formMode={'edit'} />
      </div>
    </MainContentWrapper>
  );
};

export default page;
