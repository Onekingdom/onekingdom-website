"use client";
import { EventsStorage } from "@/types/events";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import FadeIn from "@/components/Framer/FadeIn";

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
        <div className="progress_line_wrapper">
          <div className={`progress_line `}>
            <Swiper
              slidesPerView={5}
              spaceBetween={0}
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
          </div>
        </div>
      </div>
    </>
  );
}
