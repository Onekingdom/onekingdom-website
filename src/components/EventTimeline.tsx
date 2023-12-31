"use client";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useState } from "react";
import FadeIn from "./Framer/FadeIn";
import { EventsStorage } from "@/types/events";
import EventTimelineNav from "./EventTimelineNav";
import EventTimelineCard from "./EventTimelineCard";

interface Props {
  title: string;
  events: EventsStorage;
}
const EventTimeline = ({ title, events }: Props) => {
  const [active, setActive] = useState(1);
  return (
    <FadeIn>
      <div className="container py-4">
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
              {events.documents.map((event) => {
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
    </FadeIn>
  );
};
export default EventTimeline;
