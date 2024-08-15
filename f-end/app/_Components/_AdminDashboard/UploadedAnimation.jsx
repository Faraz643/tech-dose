import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { UploadedAnimationJson } from "@/public/assets/_index";
const UploadedAnimation = ({ ml, styling }) => {
  return (
    <div className={`absolute ml-[${ml}]`}>
      <Player
        autoplay
        loop={0}
        src={UploadedAnimationJson}
        // style={{ height: "50px", width: "50px" }}
        style={styling}
      />
    </div>
  );
};

export default UploadedAnimation;
