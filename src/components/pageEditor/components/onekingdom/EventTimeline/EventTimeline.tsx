import { EditorElement } from "@/types/pageEditor";
import React, { use, useEffect, useState } from "react";
import { EventTimeLineContent } from ".";
import { Swiper, SwiperSlide } from "swiper/react"; 
import Divider from "@/components/svg/Divider.svg";
import { Controller } from "swiper/modules";
import EventTimelineNav from "./EventTimelineNav";
import { EventsStorage } from "@/types/events";
import EventTimelineCard from "./EventTimelineCard";
import useEvents from "@/hooks/useEvents";

type Props = {
  element: EditorElement<EventTimeLineContent>;
};

export default function EventTimeline() {
  const [active, setActive] = useState(1);
  const { events } = useEvents();
  

  if(!events) return null;

  return (
    <div className="relative py-40">
      <span className="fill-[#111111] absolute inset-x-0 w-full top-0 h-auto block z-50 text-black">
        <Divider />
      </span>
      <span className="fill-[#111111] absolute inset-x-0 bottom-[-1px] transform rotate-180">
        <Divider />
      </span>
      <div className="container">

        <div className="neoh_fn_timeline">
          <div className="timeline_content">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={(x) => setActive(x.activeIndex + 1)}
              className="timeline_list"
              style={{ width: "100%" }}
              modules={[Controller]}
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
  );
}
