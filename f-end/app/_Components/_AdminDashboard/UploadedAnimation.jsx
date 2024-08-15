import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { UploadedAnimationJson } from "@/public/assets/_index";
const UploadedAnimation = () => {
  return (
    <div className="absolute ml-[200px]">
      <Player
        autoplay
        loop={0}
        src={UploadedAnimationJson}
        style={{ height: "50px", width: "50px" }}
      />
    </div>
  );
};

export default UploadedAnimation;
