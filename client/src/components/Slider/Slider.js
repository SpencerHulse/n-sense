import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { sliderData } from "./slider-data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  return (
    <div className="slider">
      <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
      <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>

      {sliderData.map((slide, index) => {
          return(
              <div className={index === currentSlide ? "slide current" : "slide"} key={index}>

              </div>
          )
      })}
    </div>
)  
};
export default Slider;
