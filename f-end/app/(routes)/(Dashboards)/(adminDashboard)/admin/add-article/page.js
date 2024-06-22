// "use client";
import ArticleForm from "@/app/_Components/_AdminCreatePost/ArticleForm";
import MainContentWrapper from "@/app/_Components/_AdminDashboard/MainContentWrapper";
// import React, { useEffect } from "react";
import React from "react";

const page = () => {
  console.log("Updated from here");
  // useEffect(() => {
  // console.log("updated from here");
  // });
  return (
    <MainContentWrapper>
      <h1 className="text-center text-2xl">Create a new post</h1>
      <div id="form-area">
        <ArticleForm formMode={"add"} />
      </div>
    </MainContentWrapper>
  );
};

export default page;
