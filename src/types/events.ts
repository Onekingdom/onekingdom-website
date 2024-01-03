import { Models } from "appwrite";

export interface Event {
  title: string;
  eventDate: Date;
  Location: string;
  description: string;
  shortDescription: string;
  Images: Image[];
}

export interface Image {
  bucketID: string;
  imageID: string;
}

export interface EventStorage extends Models.Document, Event {}
export interface EventsStorage extends Models.DocumentList<EventStorage> {}
