"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { EventStorage } from "@/types/events";
import formatDate from "@/utils/formatDate";
import { storage } from "@/utils/clientAppwrite";
import useShortEditor from "@/hooks/editors/useShortEditor";
import { EditorContent } from "@tiptap/react";
import Image from "next/image";

interface Props {
  event: EventStorage;
}

export default function EventTimelineCard({ event }: Props) {
  const { editor } = useShortEditor({ savedContent: event.shortDescription });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(false);
  }, [editor]);

  return (
    <li className="road_item w-full" style={{ margin: "1rem 0" }}>
      <div className="t_item w-full">
        <div className="t_item_img">
          <div className="neoh_fn_gallery_1_2">
            <div className="gallery_in">
              {event.Images.slice(0, 3).map((image, index) => {
                const x = storage.getFilePreview(image.bucketID, image.imageID, 250, 250);

                return (
                  <div className={`item ${index === 0 ? "row2" : ""}`} key={index}>
                    <Image src={x.href} alt="" width={250} height={250} />
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
          <span className="fn_desc">
            <EditorContent editor={editor} />
          </span>
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
