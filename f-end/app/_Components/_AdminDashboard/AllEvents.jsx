"use client";

import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import useFetchEvents from "@/app/(routes)/(blog)/useFetchEvents";
import {
  MonthlyFilterContext,
  useMonthlyFilterContext,
} from "@/app/_Components/_AdminDashboard/MonthFilterContext";
import EventCard from "@/app/_Components/_AdminDashboard/EventsCard";
import { useCategoryFilterContext } from "./CategoryFilterContexts";

const AllEvents = () => {
  // const { filteredMonth } = useMonthlyFilterContext();
  const { eventStatusFilter, setEventStatusFilter } =
    useCategoryFilterContext();

  const [eventDeleted, setEventDeleted] = useState(true);
  const { allEvents, fetchData } = useFetchEvents();
  //   const { allEvents, fetchEventsData } = useFetchEvents();
  // console.log("this are events var", allEvents);
  useEffect(() => {
    fetchData();
  }, [eventDeleted]);
  const filteredEvents =
    eventStatusFilter === "Show All"
      ? allEvents
      : allEvents.filter((event) => event.status === eventStatusFilter);
  // console.log("fake events", filteredEvents);
  return (
    <div className="bg-blur min-h-[300px] mt-3 rounded-[25px] !border-white flex gap-5 p-3 flex-wrap justify-center ">
      {filteredEvents.map((event, index) => (
        <EventCard
          eventDetails={event}
          onDelete={setEventDeleted}
          key={index}
        />
      ))}
    </div>
  );
};

export default AllEvents;
