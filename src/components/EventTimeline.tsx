"use client";
import { EventsStorage } from "@/types/events";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import EventTimelineCard from "./EventTimelineCard";
import EventTimelineNav from "./EventTimelineNav";
import FadeIn from "./Framer/FadeIn";

interface Props {
  title: string;
  events: EventsStorage;
}
const Timeline = ({ title, events }: Props) => {
  const [active, setActive] = useState(1);
  return (
    <FadeIn>
      <div className="relative py-40">
        <img src="svg/divider.svg" alt="" className="fn__svg fn__divider top_divider" />
        <img src="svg/divider.svg" alt="" className="fn__svg fn__divider bottom_divider" />
        <div className="container">
          <div className="neoh_fn_title">
            <h3 className="fn_title">{title}</h3>
            <div className="line">
              <span />
            </div>
          </div>

          <div className="neoh_fn_timeline">
            <div className="timeline_content">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(x) => setActive(x.activeIndex + 1)}
                onSwiper={(swiper) => console.log(swiper)}
                className="timeline_list"
                style={{ width: "100%" }}
              >
                <EventTimelineNav events={events} active={active} />
                {events.documents &&
                  events.documents.map((event) => {
                    return (
                      <SwiperSlide key={event.$id}>
                        <EventTimelineCard event={event} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};
export default Timeline;
