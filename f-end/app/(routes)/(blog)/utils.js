// navLink + socialLinks
import {
  homeIcon,
  blogIcon,
  eventIcon,
  aboutIcon,
  xIcon,
  instagramIcon,
  gamingConsole,
  gadgets,
  vrMan,
} from "@/public/assets/_index";

const navLinks = [
  {
    id: "home",
    title: "Home",
    link: "/",
    icon: homeIcon,
  },
  {
    id: "blog",
    title: "Blog",
    link: "/blog",
    icon: blogIcon,
  },
  {
    id: "events",
    title: "Events",
    link: "/events",
    icon: eventIcon,
  },
  {
    id: "about",
    title: "About",
    link: "/about",
    icon: aboutIcon,
  },
];

const socialLinks = [
  {
    id: "x",
    socialName: "X",
    socialIcon: xIcon,
    socialLink: "https://x.com",
  },
  {
    id: "instagram",
    socialName: "Instagram",
    socialIcon: instagramIcon,
    socialLink: "https://instagram.com",
  },
];

const topImagesCard = [
  {
    key: 1,
    imageSrc: gamingConsole,
    alt: "Gaming Console",
  },
  {
    key: 2,
    imageSrc: gadgets,
    alt: "Gadgets",
  },
  {
    key: 3,
    imageSrc: vrMan,
    alt: "Man wearing VR headset",
  },
];

const months = [
  { month: "January", id: 1 },
  { month: "February", id: 2 },
  { month: "March", id: 3 },
  { month: "April", id: 4 },
  { month: "May", id: 5 },
  { month: "June", id: 6 },
  { month: "July", id: 7 },
  { month: "August", id: 8 },
  { month: "September", id: 9 },
  { month: "October", id: 10 },
  { month: "November", id: 11 },
  { month: "December", id: 12 },
];

export { navLinks, socialLinks, topImagesCard, months };
