import localfont from "next/font/local";
import "../../styles/globals.css";
import { Header } from "@/app/_Components/_Blog/Header";
import Footer from "@/app/_Components/_Blog/Footer";
import Contexts from "@/app/_Components/_Blog/Contexts";
import Heading from "@/app/_Components/_Blog/Heading";
import { FooterSignature } from "@/app/_Components/_Blog/FooterSignature";
export const futureEarth = localfont({
  src: [
    {
      path: "../../../public/assets/fonts/future-earth/future-earth.ttf",
      weight: "900",
    },
  ],
  variable: "--font-futureEarth",
});

export const futuraBKBT = localfont({
  src: [
    {
      path: "../../../public/assets/fonts/futura-bk-bt/FutuBk.ttf",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/futura-bk-bt/FuturaMdBT.ttf", // Ensure correct path
      weight: "700", // Bold weight
      // style: "normal",
    },
  ],
  variable: "--font-futura",
});

export const metadata = {
  title: "Tech Dose",
  description: "Welcome to Tech Dose Blog",
};

export default function RootLayout(props) {
  // console.log(props)
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
          {props.children}
          <Footer />
          <Heading headingFor={"/"} />
          {props.modal}
          <FooterSignature />
        </Contexts>
      </body>
    </html>
  );
}
