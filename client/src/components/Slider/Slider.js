import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { sliderData } from "./slider-data";
import { Link } from "react-router-dom";
import "./slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 8000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      <FontAwesomeIcon
        icon={faAngleLeft}
        className="arrow prev"
        onClick={prevSlide}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        icon={faAngleRight}
        className="arrow next"
        onClick={nextSlide}
      ></FontAwesomeIcon>

      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" />
                <div className="content">
                  <h2>{slide.title}</h2>
                  <hr />
                  <button
                    type="button"
                    className="shop --btn --btn-primary border-white border-4 py-4 px-8"
                  >
                    <Link to={slide.href}>Shop Today</Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Slider;
