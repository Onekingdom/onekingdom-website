"use client"
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation } from "swiper/modules";


interface Props {
  imgs: string[];

}


export function Carousel({ imgs }: Props) {
  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {imgs.map((image) => (
          <SwiperSlide key="">
            <ImageContainer image={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}




const ImageContainer = ({ image }: { image: string }) => {
  return (
    <div className="w-full h-full bg-[url('/logo.png')] bg-contain">
      <img src={image} className="" />
    </div>
  );
};