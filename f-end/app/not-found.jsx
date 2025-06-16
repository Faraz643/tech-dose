import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { notFoundImage } from "@/public/assets/_index";

export default function Page() {
  return (
    <div className="bg-[#272727] h-[100vh] flex flex-col items-center justify-center ">
      <div>
        <h1 className="font-bold text-white">404 - Page Not Found</h1>
      </div>

      <Image
        src={notFoundImage} // Example Rocket Singh meme image
        alt="404_Page_Not_Found_Image"
        height={400}
        width={700}
      />
    </div>
  );
}
