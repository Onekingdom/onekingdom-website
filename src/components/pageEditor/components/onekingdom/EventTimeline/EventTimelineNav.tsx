"use client";
import { EventsStorage } from "@/types/events";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import FadeIn from "@/components/Framer/FadeIn";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface Props {
  events: EventsStorage;
  active: number;
}

export default function EventTimelineNav({ events, active }: Props) {
  const { width } = useWindowDimensions();
  const swiper = useSwiper();

  const calcFilter = (value: number) => (100 / active) * value;

  const onClick = (value: number) => {
    swiper.slideTo(value - 1);
  };
  const activeClass = (value: number) => (value === active ? "active" : value > active ? "next" : "previous");

  return (
    <>
      <div className="relative h-[62px] w-full mt-5 px-5">
        <div className="w-full h-full relative">
          <div className="absolute left-0 top-8 bg-[#252525] w-full h-[2px]">
            <Swiper
              slidesPerView={width ? width < 1024 ? 2 : 6 : 2}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              style={{ overflow: "visible" }}
            >
              {events.documents.map((event, index) => {
                let delay = 0.3 * (index + 1);

                if (index > 5) {
                  delay = 0;
                }
                index++;

                return (
                  <SwiperSlide key={index}>
                    <FadeIn delay={delay}>
                      <li className={activeClass(index)} style={{ cursor: "pointer" }} key={event.id}>
                        {/* import { cn } from "@/lib/utils"; */}

                        <a
                          onClick={() => onClick(index)}
                          className=" lg:left-28  block text-sm text-uppercase absolute whitespace-nowrap top-full py-2  after:absolute after:bottom-full after:w-full after:h-full after:left-0"
                        >
                          <span
                            className={cn("block text-[#666] text-sm uppercase", {
                              "text-[#ccc]": index === active,
                            })}
                          >
                            {new Date(event.eventDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </span>
                          <span
                            className={cn("w-3 h-3 rounded-full block absolute bg-[#252525]  bottom-full left-1/2 -ml-[5px] -mb-[6px]", {
                              "bg-[#78f701]": index <= active,
                              // create a brighness filter for the next events
                            })}
                            style={{ filter: `brightness(${index >= active ? 300 : calcFilter(index)}%)` }}
                          />
                        </a>
                      </li>
                    </FadeIn>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
