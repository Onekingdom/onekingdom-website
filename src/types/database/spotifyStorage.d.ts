import { Models } from "appwrite";
import { SpotifyQueue } from "../spotify";




export interface SpotifyQueueStorage extends SpotifyQueue, Models.Document {}