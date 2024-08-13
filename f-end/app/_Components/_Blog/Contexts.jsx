"use client";

import { useParams, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { navLinks } from "@/app/(routes)/(blog)/utils";
export const ActiveNavContext = createContext();

const Contexts = ({ children }) => {
  // works as parent component having state which is shared by each of its children component
  const activeMenuLink = usePathname();
  // const activeMenu = (navLinks.find((obj) => obj.link === activeMenuLink).id)
  const foundObject = navLinks.find((obj) => obj.link === activeMenuLink); // check whether menu is there in database or not
  const activeMenu = foundObject ? foundObject.id : "blog"; //if true, store that menu id, else store another value
  const [active, setActive] = useState(activeMenu); // active navbar menu

  useEffect(() => {
    if (activeMenuLink === "/") {
      document.body.style.backgroundColor = "#201F1E"; // can use states here
    } else if (activeMenuLink === "/blog") {
      document.body.style.backgroundColor = "#ECECEC";
    }
  }, []);

  return (
    <ActiveNavContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveNavContext.Provider>
  );
};

export default Contexts;
