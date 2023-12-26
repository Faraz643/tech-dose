"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
const LOCAL_DOMAIN = 'http://localhost:5000'
export default function Home() {
  useEffect(() => {
    fetch(`${LOCAL_DOMAIN}/api/home`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      });
  }, []);
  return <h1>THIS IS HOME PAGE</h1>;
}
