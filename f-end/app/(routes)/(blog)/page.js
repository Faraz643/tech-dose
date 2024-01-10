// useEffect(() => {
//   fetch(`${LOCAL_DOMAIN}/api/home`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     });
// }, []);
"use client";
import HeroSection from "@/app/_Components/_Blog/__HomePage/HeroSection";
import Section2 from "@/app/_Components/_Blog/__HomePage/Section2";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";

const LOCAL_DOMAIN = "http://localhost:3000";

const Home = () => {
  return (
    <>
      {/* SECTION 1 > HEADING_C*/}
      <HeroSection />
      <div className="flex justify-center bg-[#ECECEC] rounded-[30px]">
        <Section2 />
        {/* SECTION 2 > HEADING_C*/}
        {/* SECTION 3 > HEADING_C*/}
        {/* SECTION 4 > HEADING_C*/}
        {/* SECTION 5 > HEADING_C */}
      </div>
    </>
  );
};

export default Home;
