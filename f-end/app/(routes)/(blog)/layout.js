import localfont from "next/font/local";
import "../../styles/globals.css";
import { Header } from "@/app/_Components/_Blog/Header";
import Footer from "@/app/_Components/_Blog/Footer";
import Contexts from "@/app/_Components/_Blog/Contexts";
import Heading from "@/app/_Components/_Blog/Heading";
const futureEarth = localfont({
  src: [
    {
      path: "../../../public/assets/fonts/future-earth/future-earth.ttf",
      weight: "900",
    },
  ],
  variable: "--font-futureEarth",
});

const futuraBKBT = localfont({
  src: [
    {
      path: "../../../public/assets/fonts/futura-bk-bt/FutuBk.ttf",
      weight: "900",
    },
  ],
  variable: "--font-futura",
});

export const metadata = {
  title: "Tech Dose",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${futureEarth.variable} ${futuraBKBT.variable} font-futura`}
    >
      <head></head>
      <body>
        <Contexts>
          <Header />
          <Heading headingFor={"/blog"} />

          {children}
          {/* <Footer /> */}
          <Heading headingFor={"/"} />
        </Contexts>
      </body>
    </html>
  );
}
