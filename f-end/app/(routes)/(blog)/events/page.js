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

function Events() {
  const [activeCard, setActiveCard] = useState(0);
  const [eventActiveinfo, setEventActiveinfo] = useState();

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
            {eventDetails.map((card, index) => (
              <div
                key={index}
                className={`rm-clr relative rounded-[50px] ${styles.cards} ${
                  activeCard === index ? styles.active : ""
                }`}
                style={{
                  backgroundImage: `url(${vrMan.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  
                }}
                onMouseOver={() => handleMouseOver(index)}
              >
                <Image src={completedEvents} height={25} width={25} className="absolute bottom-4 ml-6" alt="Event current status"/>
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
                          Hackathon 2.0
                        </h2>
                      </div>
                      <div className="justify-self-center">
                        <span className="text-white ">24th April</span>
                      </div>
                    </div>
                    <div>
                      <a href="#" className="bg-white rounded-[20px] p-1 px-3">
                        See info
                      </a>
                    </div>
                  </div>
                  <span className="p-7 text-white absolute bottom-0">
                    Status: Upcoming
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

const eventDetails = [
  { id: 1, image: vrMan },
  { id: 2, image: vrMan },
  { id: 3, image: vrMan },
  { id: 4, image: vrMan },
  { id: 5, image: vrMan },
  { id: 6, image: vrMan },
  { id: 7, image: vrMan },
];

export default Events;
