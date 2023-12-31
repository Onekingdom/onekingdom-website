import { Models } from "appwrite";
import { UserIntegrations, spotifyIntergration } from "../UserIntegrations";

export interface UserIntegrationsStorage extends Models.Document, UserIntegrations {}


export interface SpotifyIntegrationsStorage extends Models.Document, spotifyIntergration {} 