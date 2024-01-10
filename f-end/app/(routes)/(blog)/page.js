// useEffect(() => {
//   fetch(`${LOCAL_DOMAIN}/api/home`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     });
// }, []);
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";

const LOCAL_DOMAIN = "http://localhost:3000";

const Home = () => {
  return (
    <h1 className="font-futureEarth">THIS IS HOME PAGE</h1>
    // {/* SECTION 1 > HEADING_C*/}
    // {/* SECTION 2 > HEADING_C*/}
    // {/* SECTION 3 > HEADING_C*/}
    // {/* SECTION 4 > HEADING_C*/}
    // {/* SECTION 5 > HEADING_C */}
  );
};

export default Home;
