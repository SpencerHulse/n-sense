import React, { useEffect } from "react";
import ScrollCard from "../ScrollCard";

function ScrollCardCarousel() {
  return (
    <div className="mt-10">
      <h1 className="font-bold text-3xl mb-10">
        New and Noteworthy
      </h1>
      <div className="flex overflow-x-scroll hide-scroll-bar">
        <div className="flex flex-nowrap">
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
    </div>
  );
}

export default ScrollCardCarousel;
