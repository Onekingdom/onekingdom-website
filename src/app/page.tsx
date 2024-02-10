import About from "@/components/About";
import EventTimeline from "@/components/EventTimeline";
import Investors from "@/components/Investors";
import TeamSection from "@/components/TeamSection";
import Hero from "@/components/hero";
import { memberStorage } from "@/types/database/members";
import { EventStorage } from "@/types/events";
import { database } from "@/utils/serverAppwrite";
import { Query } from "appwrite";
import { Metadata } from "next";

//get events
async function getEvents() {
  const res = await database.listDocuments<EventStorage>("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd");
  return res;
}

//get partners
async function getMembers() {
  const res = await database.listDocuments<memberStorage>("658fabb7b076a84d06d2", "65b88761559a4aa41f38");
  return res;
}


export const metadata: Metadata = {
  title: "Home | One Kingdom",
}



export default async function Home() {
  const events = await getEvents();
  const members = await getMembers();

  const parthers = members.documents.filter((member) => member.partneredStreamer === true);
  const staff = members.documents.filter((member) => member.staffMember === true);


  return (
    <>
      <Hero title="One Kingdom" subtitle="Welcome to" description="Welcome to" />
      <About />
      <TeamSection title="Our Partnered Streamers" description="The One Kingdom Team" members={parthers} />
      <EventTimeline title="Events" events={events} />
      {/* <Investors Title="Investors" /> */}
      <TeamSection title="Our Staff Members" description="The One Kingdom Team"  members={staff}/>
    </>
  );
}
