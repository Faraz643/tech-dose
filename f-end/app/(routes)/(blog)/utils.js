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
  twitterFeedThumbnail,
  iPhone15Thumbnail,
  metaArVrThumbnail,
  flyingCarThumbnail,
  smartRingThumbnail,
  appleWatchThumbnail,
  transparentTechThumbnail,
  greeting,
  article,
  editors,
  home,
  loading,
  logout,
  search,
  setting,
  slug,
  tag,
  text,
  userProfile,
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

const adminMenuLink = [
  {
    id: "dashboard",
    menuName: "Dashboard",
    menulink: "/admin/dashboard",
    menuIcon: home,
  },
  {
    id: "createPost",
    menuName: "Create Post",
    menulink: "/admin/create-post",
    menuIcon: article,
  },
  {
    id: "manageTags",
    menuName: "Manage Tags",
    menulink: "/admin/manage-tags",
    menuIcon: tag,
  },
  {
    id: "manageEditors",
    menuName: "Manage Editors",
    menulink: "/admin/manage-editors",
    menuIcon: editors,
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

const articleDetails = [
  {
    id: 1,
    thumbnail: twitterFeedThumbnail,
    title: "Metas Threads: From Boom to Search for New Users",
    description: "",
    tag: "Twitter",
  },
  {
    id: 2,
    thumbnail: appleWatchThumbnail,
    title: "Metas Threads: From Boom to Search for New Users",
    description: "",
    tag: "Apple",
  },
  {
    id: 3,
    thumbnail: smartRingThumbnail,
    title: "Metas Threads: From Boom to Search for New Users",
    description: "",
    tag: "Tech",
  },
  {
    id: 4,
    thumbnail: flyingCarThumbnail,
    title: "Metas Threads: From Boom to Search for New Users",
    description: "",
    tag: "Future Tech",
  },
  {
    id: 5,
    thumbnail: metaArVrThumbnail,
    title: "Metas Threads: From Boom to Search for New Users",
    description: "",
    tag: "Tech",
  },
  {
    id: 6,
    thumbnail: iPhone15Thumbnail,
    title: "Metas Threads: From Boom to Search for New Users",
    description: "",
    tag: "Apple",
  },

  {
    id: 7,
    thumbnail: transparentTechThumbnail,
    title: "Metas Threads: From Boom to Search for New Users",
    description: "",
    tag: "Gadgets",
  },
];

export {
  navLinks,
  socialLinks,
  topImagesCard,
  months,
  articleDetails,
  adminMenuLink,
};
