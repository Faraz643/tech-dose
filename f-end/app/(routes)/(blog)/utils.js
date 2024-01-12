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
    id: 'home',
    title: "Home",
    link: "/",
    icon: homeIcon,
  },
  {
    id: 'blog',
    title: "Blog",
    link: "/blog",
    icon: blogIcon,
  },
  {
    id: 'events',
    title: "Events",
    link: "/events",
    icon: eventIcon,
  },
  {
    id: 'about',
    title: "About",
    link: "/about",
    icon: aboutIcon,
  },
];

const socialLinks = [
  {
    id: 'x',
    socialName: "X",
    socialIcon: xIcon,
    socialLink: "https://x.com",
  },
  {
    id: 'instagram',
    socialName: "Instagram",
    socialIcon: instagramIcon,
    socialLink: "https://instagram.com",
  },
];

const topImagesCard = [
  {
    imageSrc: gamingConsole,
    alt: 'Gaming Console'
  },
  {
    imageSrc: gadgets,
    alt: 'Gadgets'
  },
  {
    imageSrc: vrMan,
    alt: 'Man wearing VR headset'
  },
];

export { navLinks, socialLinks, topImagesCard };
