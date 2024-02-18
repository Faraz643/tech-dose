import DashboardInfoCard from "@/app/_Components/_AdminDashboard/DashboardInfoCard";
import React from "react";
const page = () => {
  return (
    <main className="bg-blur flex-1 rounded-[25px]">
      <div className="flex flex-wrap gap-2 justify-between p-5">
        <DashboardInfoCard title={"Total Article Published"} counts={"23"} />
        <DashboardInfoCard title={"Total Tags"} counts={"23"} />
        <DashboardInfoCard title={"Total Editors"} counts={"23"} />
      </div>
    </main>
  );
};

export default page;
