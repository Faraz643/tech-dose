"use client";
import Image from "next/image";
import {
  eventBanner,
  vrMan,
  liveEvent,
  completedEvents,
  upcomingEvent,
} from "@/public/assets/_index";
import React, { useState } from "react";
import styles from "./eventCard.module.css";
import useFetchEvents from "../useFetchEvents";
import Link from "next/link";

function Events() {
  const [activeCard, setActiveCard] = useState(0);
  const [eventActiveinfo, setEventActiveinfo] = useState();
  const { allEvents } = useFetchEvents();
  const handleMouseOver = (index) => {
    setActiveCard(index);
  };
  const handleMouseOverEventInfo = (index) => {
    setEventActiveinfo("active");
  };

  return (
    <section className="w-full my-[30px]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col items-center my-5">
          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-200">
            Upcoming Events
          </div>
          <h2 className="my-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Mark your calendars
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-[1.4rem]">
            Check out the latest events happening on campus and add them to your
            calendar.
          </p>
        </div>
        <div className="event-banner-image w-full h-[450px] rounded-[40px] bg-cover bg-center"></div>
        {/* Events card */}
        <div className="py-10">
          <div className={styles.cardContainer}>
            {/* using fetch, get all the events in an array, then use the array here to show all the events */}
            {allEvents.map((card, index) => (
              <div
                key={index}
                className={`rm-clr relative rounded-[50px] ${styles.cards} ${
                  activeCard === index ? styles.active : ""
                }`}
                style={{
                  backgroundImage: `url(${card.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onMouseOver={() => handleMouseOver(index)}
              >
                <Image
                  src={completedEvents}
                  height={25}
                  width={25}
                  className="absolute bottom-4 ml-6"
                  alt="Event current status"
                />
                <div
                  className={`${styles.cardEventsInfo} ${eventActiveinfo} ${
                    activeCard === index ? styles.infoActive : ""
                  }`}
                  onMouseOver={() => handleMouseOverEventInfo(index)}
                >
                  <div className="flex flex-col gap-10 items-center justify-center h-[inherit]">
                    <div className="flex-col items-center justify-center">
                      <div>
                        <h2
                          className={`text-white font-bold text-5xl event-heading ${styles.eventHeading}`}
                        >
                          {" "}
                          {card.name}
                        </h2>
                      </div>
                      <div className="justify-self-center">
                        <span className="text-white ">
                          <DateDisplay date={card.event_date} />
                        </span>
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/events/${card.event_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-[20px] p-1 px-3"
                      >
                        See info
                      </Link>
                    </div>
                  </div>
                  <span className="p-7 text-white absolute bottom-0">
                    Status: {card.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Function to add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Covers 4th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}

export function DateDisplay({ date }) {
  return <p>{formatDate(date)}</p>;
}

export default Events;
