import React from "react";
import Description from "./Description";
import SliderImageAnimation from "./SliderImageAnimation"

const index = () => {
  return (
    <div className="Content">
      <div className="row">
        <div className="col-lg-4">
          <Description />
        </div>
        <div className="col-lg-8">
          <SliderImageAnimation />
        </div>
      </div>
    </div>
  );
};

export default index;
