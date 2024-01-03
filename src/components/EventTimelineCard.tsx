import React from "react";
import Link from "next/link";
import { EventStorage } from "@/types/events";
import formatDate from "@/utils/formatDate";
import { storage } from "@/utils/clientAppwrite";

interface Props {
  event: EventStorage;
}

export default function EventTimelineCard({ event }: Props) {
  return (
    <li className="road_item w-full" style={{ margin: "1rem 0" }}>
      <div className="t_item h-[400px] w-full" >
        <div className="t_item_img">
          <div className="neoh_fn_gallery_1_2">
            <div className="gallery_in">
              {event.Images.slice(0, 3).map((image, index) => {
                const x = storage.getFilePreview(image.bucketID, image.imageID, 250, 250);

                return (
                  <div className={`item ${index === 0 ? "row2" : ""}`} key={index}>
                    <img src={x.href} alt={image.imageID} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="t_item_info">
          <p className="fn_date">
            <span>{new Date(event.eventDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </p>
          <h3 className="fn_title">
            <Link href={`/events/${event.$id}`}>{event.title}</Link>
          </h3>
          <p className="fn_desc">{event.shortDescription}</p>
          <p className="fn_read">
            <Link href={`/events/${event.$id}`} className="neoh_fn_button only_text">
              <span className="text">Read More</span>
            </Link>
          </p>
        </div>
      </div>
    </li>
  );
}

function Temp() {
  return (
    <li className={`timeline_item active `} data-index={1}>
      <div className="t_item">
        <div className="t_item_img">
          <div className="neoh_fn_gallery_1_2">
            <div className="gallery_in">
              <div className="item row2">
                <img src="img/timeline/1/1.jpg" alt="" />
              </div>
              <div className="item">
                <img src="img/timeline/1/2.jpg" alt="" />
              </div>
              <div className="item">
                <img src="img/timeline/1/3.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="t_item_info">
          <p className="fn_date">
            <span>May 05, 2022</span>
          </p>
          <h3 className="fn_title">
            <Link href="/roadmap-single">New Character Set #12 is Coming Up</Link>
          </h3>
          <p className="fn_desc">
            Morbi non dignissim erat, a blandit felis. Suspendisse nec lorem vel orci varius congue ut vitae est. Nam quis tempus nisl. Fusce posuere
            nibh a mi molestie, sit amet ornare lectus interdum.
          </p>
          <p className="fn_read">
            <Link href="/roadmap-single" className="neoh_fn_button only_text">
              <span className="text">Read More</span>
            </Link>
          </p>
        </div>
      </div>
    </li>
  );
}
