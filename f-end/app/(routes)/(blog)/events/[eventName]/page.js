import React from "react";
import Image from "next/image";
import styles from "../eventCard.module.css";

import {
  venueIcon,
  clockIcon,
  dateIcon,
  eligibilityIcon,
} from "@/public/assets/_index";
const Page = () => {
  return (
    <section className="w-full my-[30px]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div
          className="w-full h-[450px] rounded-[40px] bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/images/events-images/holo-banner-image.jpg')`,
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
                  <h2 className="text-4xl text-center">Santa's Scientific Workshop</h2>
                </div>
                <div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
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
                <span className="font-bold">Venue Hall 1</span>
              </div>
              <div className="flex gap-5">
                <Image src={dateIcon} height={20} width={25} alt="Date Icon" />
                <span className="font-bold">Dec 14, 2025</span>
              </div>
              <div className="flex gap-5">
                <Image
                  src={clockIcon}
                  height={20}
                  width={25}
                  alt="Clock Icon"
                />
                <span className="font-bold">5:30-8:30</span>
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
