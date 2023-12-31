import EventTimelineCard from "@/components/EventTimelineCard";
import { EventStorage } from "@/types/events";
import { database } from "@/utils/serverAppwrite";

async function getEvents() {
  const res = await database.listDocuments<EventStorage>("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd");
  return res;
}


export default async function Page() {
  const events = await getEvents();


  return (
    <div className="neoh_fn_roadmappage">
      <div className="container">
        <div className="neoh_fn_roadmaplist">
          <ul className="roadlist">
            {events.documents.map((event) => {
              return <EventTimelineCard event={event} key={event.$id} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
