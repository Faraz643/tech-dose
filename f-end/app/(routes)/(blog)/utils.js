// navLink + socialLinks
import {
  homeIcon,
  blogIcon,
  eventIcon,
  aboutIcon,
  xIcon,
  instagramIcon,
} from "@/public/assets/_index";

const navLinks = [
  {
    id: home,
    title: "Home",
    link: "/",
    icon: homeIcon,
  },
  {
    id: blog,
    title: "Blog",
    link: "/blog",
    icon: blogIcon,
  },
  {
    id: events,
    title: "Events",
    link: "/events",
    icon: eventIcon,
  },
  {
    id: about,
    title: "About",
    link: "/about",
    icon: aboutIcon,
  },
];

const socialLinks = [
  {
    id: x,
    socialName: "X",
    socialIcon: xIcon,
    link: 'https://x.com',
  },
  {
    id: instagram,
    socialName: "Instagram",
    socialIcon: instagramIcon,
    link: 'https://instagram.com',
  },
];

export { navLinks, socialLinks };
