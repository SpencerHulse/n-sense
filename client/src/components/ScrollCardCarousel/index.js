import React, { useEffect } from "react";
import ScrollCard from "../ScrollCard";

function ScrollCardCarousel() {
  return (
    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
      <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
        <ScrollCard />
        <ScrollCard />
        <ScrollCard />
        <ScrollCard />
        <ScrollCard />
        <ScrollCard />
        <ScrollCard />
        <ScrollCard />
      </div>
    </div>
  );
}

export default ScrollCardCarousel;
