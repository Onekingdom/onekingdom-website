import FormSubmitComponent from "@/components/PageBuilder/FormSubmitComponent";
import Share from "@/components/Share";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import { EventStorage } from "@/types/events";
import { storage } from "@/utils/clientAppwrite";
import { database } from "@/utils/serverAppwrite";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getEvent(slug: string) {
  try {
    const res = await database.getDocument<EventStorage>("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd", slug);
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

type Props = {
  params: { slug: string };
  searchParams: URLSearchParams;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const event = await getEvent(params.slug);

  if (!event) return { title: "404" };

  const title = event.title;

  return {
    title: title + " - One Kingdom",
  };
}

export default async function page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  // console.log(event);

  if (!event) return <h1>404</h1>;

  const description = await JSON.parse(event.description);

  return (
    <div className="neoh_fn_roadmap neoh_fn_single">
      {/* Single Background */}
      <div className="single_bg" />
      {/* !Single Background */}
      {/* Single Content */}
      <div className="single_content">
        <div className="container" id="roadmap-single-content">
          <Share />
          <div className="neoh_fn_breadcrumbs">
            <p>
              <Link href="/">Home</Link>
              <span className="separator">/</span>
              <Link href="/events">Events</Link>
              <span className="separator">/</span>
              <span className="current">{event.title}</span>
            </p>
          </div>
          <div className="single_img aspect-video relative w-[1200px] h-[600px]">
            <Image src={storage.getFileView(event.Images[0].bucketID, event.Images[0].imageID).href } alt="" fill className="object-cover"   objectFit="cover"/>
          </div>
          {/* Mini Items  */}
          <div className="neoh_fn_minis">
            <div className="m_item">
              <a href="#">{new Date(event.eventDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</a>
            </div>
            <div className="m_item">
              <span>
                By <a href="#">{event.author}</a>
              </span>
            </div>
          </div>
          {/* !Mini Items  */}
          {/* Single Title */}

          <div className="single_title">
            <h2 className="fn_title">{event.title}</h2>
          </div>
          <FormSubmitComponent content={description} />
        </div>
      </div>
      {/* !Single Content */}
    </div>
  );
}
