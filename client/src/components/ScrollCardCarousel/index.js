import React, { useEffect } from "react";
import ScrollCard from "../ScrollCard";

function ScrollCardCarousel() {
  return (
    <div className="container flex flex-col">
      <h1 className="lg:ml-40 md:ml-20 ml-10 font-bold text-3xl">
        New and Newsworthy
      </h1>
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
    </div>
  );
}

export default ScrollCardCarousel;
