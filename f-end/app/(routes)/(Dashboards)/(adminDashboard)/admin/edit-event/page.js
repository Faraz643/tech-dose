// import EventForm from "@/app/_Components/_AdminDashboard/EventForm";
import MainContentWrapper from "@/app/_Components/_AdminDashboard/MainContentWrapper";
import React from "react";
import dynamic from "next/dynamic";

const EventForm = dynamic(
  () => import("@/app/_Components/_AdminDashboard/EventForm"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <MainContentWrapper>
      <h1 className="text-center text-2xl">Edit Event</h1>
      <div id="form-area">
        <EventForm formMode={"edit"} />
      </div>
    </MainContentWrapper>
  );
};

export default page;
