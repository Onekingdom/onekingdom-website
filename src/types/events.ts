import { Models } from "appwrite";

export interface Event {
  title: string;
  eventDate: string;
  Location: string;
  description: string;
  shortDescription: string;
  Images: Image[];
  published: boolean;
}

export interface Image {
  bucketID: string;
  imageID: string;
}

export interface EventStorage extends Models.Document, Event {}
export interface EventsStorage extends Models.DocumentList<EventStorage> {}
