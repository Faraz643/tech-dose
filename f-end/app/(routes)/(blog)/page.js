// useEffect(() => {
//   fetch(`${LOCAL_DOMAIN}/api/home`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     });
// }, []);
// const LOCAL_DOMAIN = "http://localhost:3000";
import HeroSection from "@/app/_Components/_Blog/__HomePage/HeroSection";
import Section2 from "@/app/_Components/_Blog/__HomePage/Section2";
import Section3 from "@/app/_Components/_Blog/__HomePage/Section3";
import Section4 from "@/app/_Components/_Blog/__HomePage/Section4";
import Section5 from "@/app/_Components/_Blog/__HomePage/Section5";
import Section6 from "@/app/_Components/_Blog/__HomePage/Section6";
import Heading from "@/app/_Components/_Blog/Heading";
import React from "react";
import RootLayout from "./layout";
const HomePage = () => {
  return (
    <div className="">
      <HeroSection />
      <div className="bg-[#ECECEC] rounded-[30px] min-h-[100vh]">
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        
      </div>
    </div>
  );
};

export default HomePage;
