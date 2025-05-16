// import { AdminLoginPage } from "@/components/component/admin-login-page";
// 'use client'
import React from "react";
import dynamic from "next/dynamic";

const AdminLoginPage = dynamic(
  () => import("@/components/component/admin-login-page"),
  {
    ssr: false,
  }
);



const page = () => {
  return <AdminLoginPage />;
};

export default page;
