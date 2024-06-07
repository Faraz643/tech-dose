import { eventBanner } from "@/public/assets/_index";
import Image from "next/image";
// import React from "../../../../public/assets/images/events-images/event-banner.jpg";
import React from "react";

function Events() {
  return (
    <section class="w-full my-[30px]">
      <div class="container mx-auto px-6 max-w-[1200px]">
        <div class="flex flex-col items-center my-5">
          <div class="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-200">
            Upcoming Events
          </div>
          <h2 class="my-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Mark your calendars
          </h2>
          <p class="mt-2 text-gray-500 dark:text-gray-400 text-[1.4rem]">
            Check out the latest events happening on campus and add them to your
            calendar.
          </p>
        </div>
        <div class="event-banner-image w-full h-[450px] rounded-[40px] bg-cover bg-center"></div>
      </div>
    </section>
  );
}
export default Events;
