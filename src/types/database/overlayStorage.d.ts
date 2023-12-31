import { Overlay } from "../overlay";
import { Models } from "appwrite";

export interface overlayStorage extends Overlay, Models.Document {}

export interface overlaysStorage extends Overlay, Models.DocumentList {}
