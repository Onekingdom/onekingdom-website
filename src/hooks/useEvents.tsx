import React from "react";
import { database } from "@/utils/clientAppwrite";
import { Event, EventStorage, EventsStorage } from "@/types/events";
// import { toast } from "sonner";
import { ID } from "appwrite";

export default function useEvents() {
  const [events, setEvents] = React.useState<EventsStorage>();

  React.useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    const res = await database.listDocuments<EventStorage>("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd");
    setEvents(res);
  }

  async function deleteEvent(id: string) {
    try {
      await database.deleteDocument("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd", id);
      getEvents();
    } catch (error) {
      return error;
    }
  }

  async function addEvent(event: Event) {
    console.log(event);
    try {
      await database.createDocument<EventStorage>("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd", ID.unique(), event);
      return;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function getEventbyID(id: string) {
    const res = await database.getDocument<EventStorage>("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd", id);
    return res;
  }

  async function updateEvent(id: string, event: Event) {
    const x = await database.updateDocument<EventStorage>("658fabb7b076a84d06d2", "658fabbcde4c0d2a25cd", id, event);
    console.log(event);
    return;
  }

  return { events, deleteEvent, addEvent, getEventbyID, updateEvent };
}
