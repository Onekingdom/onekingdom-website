import { Models } from "appwrite";

export interface Event {
  title: string;
  eventDate: string;
  Location: string;
  description: string;
  shortDescription: string;
  Images: Image[];
}

export interface Image extends Models.Document {
  imageURL: string;
  imageALT: string;
}

export interface EventStorage extends Models.Document, Event {}
export interface EventsStorage extends Models.DocumentList<EventStorage> {}
