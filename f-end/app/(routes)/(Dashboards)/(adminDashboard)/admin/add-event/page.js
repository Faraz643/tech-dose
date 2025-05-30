// "use client";
// import ArticleForm from "@/app/_Components/_AdminCreatePost/ArticleForm";
import MainContentWrapper from "@/app/_Components/_AdminDashboard/MainContentWrapper";
// import React, { useEffect } from "react";
import React from "react";
import dynamic from "next/dynamic";
// import EventForm from "@/app/_Components/_AdminDashboard/EventForm";

// const ArticleForm = dynamic(
//   () => import("@/app/_Components/_AdminCreatePost/ArticleForm"),
//   {
//     ssr: false,
//   }
// );
const EventForm = dynamic(
  () => import("@/app/_Components/_AdminDashboard/EventForm"),
  {
    ssr: false,
  }
);

const page = () => {
  //   console.log("Updated from here");
  // useEffect(() => {
  // console.log("updated from here");
  // });
  return (
    <MainContentWrapper>
      <h1 className="text-center text-2xl">Add New Event</h1>
      <div id="form-area">
        <EventForm formMode={"add"} />
      </div>
    </MainContentWrapper>
  );
};

export default page;
