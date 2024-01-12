import About from "@/components/About";
import EventTimeline from "@/components/EventTimeline";
import Investors from "@/components/Investors";
import TeamSection from "@/components/TeamSection";
import Hero from "@/components/hero";
import { EventStorage } from "@/types/events";
import { database } from "@/utils/serverAppwrite";

//get events
async function getEvents() {
  const res = await database.listDocuments<EventStorage>("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd");
  return res;
}

export default async function Home() {
  const events = await getEvents();

  return (
    <>
      <Hero title="One Kingdom" subtitle="Welcome to" description="Welcome to" />
      <About />
      <TeamSection title="Our Partnered Streamers" description="The One Kingdom Team" />
      <EventTimeline title="Events" events={events} />
      <Investors Title="Investors" />
      <TeamSection title="Our Staff Members" description="The One Kingdom Team" />
    </>
  );
}
