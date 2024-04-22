import SideMenu from "@/app/_Components/_AdminDashboard/SideMenu";
import SideMenuResponsive from "@/app/_Components/_AdminDashboard/SideMenuResponsive";
import ProfileInfoHeader from "@/app/_Components/_AdminDashboard/ProfileInfoHeader";
import { futuraBKBT, futureEarth } from "../(blog)/layout";
import Image from "next/image";
export const metadata = {
  title: "Tech Dose - Dashboard",
  description: "Generated by create next app",
};

export default function DashboardLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${futureEarth.variable} ${futuraBKBT.variable} font-futura`}
    >
      <head></head>
      <body suppressHydrationWarning={true} className="admin-layout">
        <div className=" flex justify-center">
          <div className="flex gap-5 px-1 py-4 h-[100vh] w-[1200px] relative max-[500px]:w-[100%] max-[500px]:px-2">
            <div className="w-[280px]  bg-red- fixed max-[810px]:hidden">
              <SideMenu />
            </div>
            <div className="w-full flex flex-col gap-2 justify-between min-[810px]:ml-[300px]">
              <ProfileInfoHeader />
              <SideMenuResponsive />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
