"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../eventCard.module.css";

import {
  venueIcon,
  clockIcon,
  dateIcon,
  eligibilityIcon,
} from "@/public/assets/_index";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { DateDisplay } from "../page";

const Page = () => {
  // const router = useRouter();
  const [eventDetails, setEventDetails] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState("skeleton");
  const params = useParams();
  const eventId = useParams().eventId;
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/event/${eventId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const result = await response.json();
          console.log(result[0]);
          // console.log(result.articleData[0])
          setEventDetails(result[0]);
          setPlaceholder("");
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.log("An error occured:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
        setPlaceholder("");
      }
    };
    fetchArticle();
  }, []);
  // const onModalClose = () => {
  //   router.back();
  // };

  return (
    <section className="w-full my-[30px]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div
          className="w-full h-[450px] rounded-[40px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${eventDetails.thumbnail})`,
          }}
        ></div>
        {/* full container */}
        <div className={`${styles.deskTPEventDetailsContainer}`}>
          {/* desc container */}
          <div
            className={`${styles.order2} max-w-[500px] self-center justify-self-center`}
          >
            {/* desc text  */}
            <div>
              {/* for alignment-  */}
              <div
                className={`flex flex-col gap-5 m-5 ${styles.eventDetailsAlign}`}
              >
                <div>
                  <span className="uppercase text-[#9748ff] text-sm">
                    overview
                  </span>
                </div>
                <div>
                  <h2 className="text-4xl text-center">
                    {placeholder === "skeleton" ? "loading" : eventDetails.name}
                  </h2>
                </div>
                <div>
                  <p>
                    {placeholder === "skeleton"
                      ? "loading"
                      : eventDetails.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* menu container - for side line flex- center */}
          <div className={`${styles.eventInfoMenu}`}>
            {/* main menu text */}
            <div className={`flex flex-col m-5 ${styles.dotBr}`}>
              <div className="flex gap-5">
                <Image
                  src={venueIcon}
                  height={20}
                  width={25}
                  alt="Venue Icon"
                />
                <span className="font-bold">
                  {placeholder === "skeleton"
                    ? "loading"
                    : eventDetails.location}
                </span>
              </div>
              <div className="flex gap-5">
                <Image src={dateIcon} height={20} width={25} alt="Date Icon" />
                <span className="font-bold">
                  {placeholder === "skeleton" ? (
                    "loading"
                  ) : (
                    <DateDisplay date={eventDetails.event_date} />
                  )}
                </span>
              </div>
              <div className="flex gap-5">
                <Image
                  src={clockIcon}
                  height={20}
                  width={25}
                  alt="Clock Icon"
                />
                <span className="font-bold">
                  {placeholder === "skeleton"
                    ? "loading"
                    : `${eventDetails.start_time} - ${eventDetails.end_time}`}
                </span>
              </div>
              <div className="flex gap-5">
                <Image
                  src={eligibilityIcon}
                  height={20}
                  width={25}
                  alt="Eligibility Icon"
                />
                <span className="font-bold">All Courses</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="font-bold border-[2px] border-black rounded-3xl p-2 hover:bg-black hover:text-white transition-all">
                Count Me In
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
