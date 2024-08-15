import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { UploadingAnimationJson } from "@/public/assets/_index";
const UploadingAnimation = ({ ml, styling }) => {
  return (
    <div className={`absolute ml-[${ml}]`}>
      <Player
        autoplay
        loop
        src={UploadingAnimationJson}
        // style={{ height: "100px", width: "100px" }}
        style={styling}
      />
    </div>
  );
};

export default UploadingAnimation;
