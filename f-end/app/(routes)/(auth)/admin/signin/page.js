// import { AdminLoginPage } from "@/components/component/admin-login-page";
import React from "react";
import dynamic from "next/dynamic";

const AdminLoginPage = dynamic(
  () => import("@/app/_Components/_AdminDashboard/EventForm"),
  {
    ssr: false,
  }
);



const page = () => {
  return <AdminLoginPage />;
};

export default page;
