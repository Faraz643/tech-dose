"use client";
import React from "react";
import { logout, setting } from "@/public/assets/_index";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserProfileOptions = () => {
  const router = useRouter();

  async function handleLogout() {
    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/sign-out`, {
      //     method: 'POST',
      //     credentials: 'include'
      // },
      // )
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      
    //   if (!response.ok) {
    //     console.log("Error logging out");
    //   }
      router.replace("/admin/signin");
    } catch (err) {
      console.error("Inter server error", err);
    }
  }

  return (
    <div className="absolute flex flex-col gap-2 items-center ml-[25%] mt-[15%] bg-white rounded-full p-1">
      <Image
        src={setting}
        width={30}
        className="object-cover hover:cursor-pointer"
        alt="User Profile Picture"
      />
      <Image
        src={logout}
        width={30}
        className="object-cover hover:cursor-pointer"
        alt="User Log Out"
        onClick={handleLogout}
      />
    </div>
  );
};

export default UserProfileOptions;
