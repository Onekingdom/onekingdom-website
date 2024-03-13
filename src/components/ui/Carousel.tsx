"use client"
import React, { useRef, useState } from "react";
import Image from "next/image";
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
        {imgs.map((image, index) => (
          <SwiperSlide key={index}>
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
      <Image src={image} alt="" fill sizes="100vw" />
    </div>
  );
};