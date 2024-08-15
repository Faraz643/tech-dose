import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { UploadingAnimationJson } from "@/public/assets/_index";
const UploadingAnimation = () => {
  return (
    <div className="absolute ml-[200px]">
      <Player
        autoplay
        loop
        src={UploadingAnimationJson}
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
};

export default UploadingAnimation;
