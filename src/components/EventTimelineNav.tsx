"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EventsStorage } from "@/types/events";
import FadeIn from "./Framer/FadeIn";
import formatDate from "@/utils/formatDate";

interface Props {
  events: EventsStorage;
  active: number;
}

export default function EventTimelineNav({ events, active }: Props) {
  const swiper = useSwiper();

  const onClick = (value: number) => {
    swiper.slideTo(value - 1);
  };
  const activeClass = (value: number) => (value === active ? "active" : value > active ? "next" : "previous");
  const filter = (value: number) => (100 / active) * value;

  const next = () => swiper.slideNext();
  const prev = () => swiper.slidePrev();

  return (
    <>
      <div className="timeline_progress">
        {/* Nav */}
        <a
          className="nav_prev c-pointer"
          onClick={() => {
            prev();
          }}
          style={{ cursor: "pointer" }}
        >
          <img src="svg/right-arr.svg" alt="" className="fn__svg" style={{ cursor: "pointer" }} />
        </a>
        <a
          onClick={() => {
            next();
          }}
          className="nav_next c-pointer"
          style={{ cursor: "pointer" }}
        >
          <img src="svg/right-arr.svg" alt="" className="fn__svg" />
        </a>
        {/* !Nav */}
        <div className="progress_line_wrapper">
          <div className={`progress_line `}>
            <Swiper
              slidesPerView={5}
              spaceBetween={0}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              // modules={[FreeMode]}
              className="mySwiper"
            >
              {events.documents.map((event, index) => {
                let delay = 0.3 * (index + 1);

                if (index > 5) {
                  delay = 0;
                }
                index++;

                return (
                  <SwiperSlide key={event.$id}>
                    <FadeIn delay={delay}>
                      <li className={activeClass(index)} style={{ cursor: "pointer" }} key={event.id}>
                        <a onClick={() => onClick(index)}>
                          <span className="text">
                            {new Date(event.eventDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </span>
                          <span className="circle" style={{ filter: `brightness(${filter(index)}%)` }} />
                        </a>
                      </li>
                    </FadeIn>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <span className="active_line" />
          </div>
        </div>
      </div>
    </>
  );
}
