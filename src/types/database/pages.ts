import { Models } from "appwrite";
import { PageDetails } from "../pageEditor";

export interface PageDetailStorage extends Models.Document, PageDetails {}

export interface savedComponentList extends Models.Document {
  component: string;
  madeBy: string;
  name: string;
}
