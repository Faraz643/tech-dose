"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { greeting, tcHeaderLogo } from "@/public/assets/_index";
import { userProfile, logout, setting } from "@/public/assets/_index";
import UserProfileOptions from "./UserProfileOptions";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
async function showActiveUserName() {
  const SECRET_KEY = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_SECRET_KEY
  );
  const token = Cookies.get("token");
  const decoded = await jwtVerify(token, SECRET_KEY);
  const userId = decoded.payload.userName;
  return userId;
}

const ProfileInfoHeader = () => {
  const [profileOptions, setProfileOptions] = useState("hide");
  const [activeUserName, setActiveUserName] = useState(null);

  useEffect(() => {
    async function loadValue() {
      const initialValue = await showActiveUserName();
      setActiveUserName(initialValue);
    }
    loadValue();
  }, []);

  function toggleProfileOptions() {
    setProfileOptions(profileOptions === "hide" ? "show" : "hide");
  }

  return (
    <section className="z-[999]">
      <div className="bg-blur h-[80px] rounded-[25px]">
        <div className="h-[100%] w-full flex justify-between p-5 items-center max-[500px]:p-1">
          <span className="min-[810px]:hidden">
            <Image src={tcHeaderLogo} width={40} alt="Tech Dose logo" />
          </span>
          <div className="flex gap-2">
            <span className="text-black text-[1.3rem] max-[500px]:text-[1.1rem]">
              Welcome, {activeUserName}
            </span>
            <span>
              <Image src={greeting} width={25} alt="Hello {user_name}" />
            </span>
          </div>
          <div className="relative">
            <div className="rounded-full border-[1.5px] border-black bg-black overflow-hidden">
              <Image
                src={userProfile}
                width={50}
                className="object-cover hover:cursor-pointer"
                alt="User Profile Picture"
                onClick={toggleProfileOptions}
              />
            </div>
            {profileOptions === "show" && <UserProfileOptions />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfoHeader;
