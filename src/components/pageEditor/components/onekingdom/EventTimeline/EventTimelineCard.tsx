"use client";
import useShortEditor from "@/hooks/editors/useShortEditor";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { EventStorage } from "@/types/events";
import { storage } from "@/lib/clientAppwrite";
import { EditorContent } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

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
    <li className="w-full" style={{ margin: "1rem 0" }}>
      <div className="p-[40px] w-full border-2 border-extra-color rounded-5 flex flex-col items-center lg:flex-row">
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-3 grid-row-3 gap-x-5 gap-y-5 ">
            {event.Images.slice(0, 3).map((image, index) => {
              const x = storage.getFilePreview(image.bucketID, image.imageID, 1000, 1000);

              return (
                <div className={`relative overflow-hidden rounded-sm ${index === 0 ? "row-span-2 col-span-2  " : ""}`} key={index}>
                  <Image
                    src={x.href}
                    alt=""
                    width={800}
                    height={800}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-[77px] text-left w-full pl-0 mt-[40px]">
          <p className="text-left text-lg text-[#cccccc] font-normal  fn_date">
            <span>{new Date(event.eventDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </p>
          <h3 className="text-2xl font-medium m-0 p-0 mb-5">
            <Link href={`/events/${event.$id}`}>{event.title}</Link>
          </h3>
          <span className="text-left text-lg text-[#cccccc] font-normal ">
            <EditorContent editor={editor} />
          </span>
          <p className="fn_read mt-5">
            <Link href={`/events/${event.$id}`} className="neoh_fn_button only_text">
              <span className="text">Read More</span>
            </Link>
          </p>
        </div>
      </div>
    </li>
  );
}
