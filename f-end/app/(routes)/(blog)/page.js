// useEffect(() => {
//   fetch(`${LOCAL_DOMAIN}/api/home`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     });
// }, []);
// const LOCAL_DOMAIN = "http://localhost:3000";
"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/app/_Components/_Blog/__HomePage/HeroSection";
import Section2 from "@/app/_Components/_Blog/__HomePage/Section2";
import Section3 from "@/app/_Components/_Blog/__HomePage/Section3";
import Section4 from "@/app/_Components/_Blog/__HomePage/Section4";
import Section5 from "@/app/_Components/_Blog/__HomePage/Section5";
import Section6 from "@/app/_Components/_Blog/__HomePage/Section6";
import { reactStrictMode } from "@/next.config";
const HomePage = () => {
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/test").then((res)=>console.log('error'))
  // }, []);

  return (
    <>
      <HeroSection />
      <div className="bg-[#ECECEC] rounded-[30px] min-h-[100vh]">
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </div>
    </>
  );
};

export default HomePage;
