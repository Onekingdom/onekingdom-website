import { Models } from "appwrite";
import { TwitchData } from "../user";

export interface TwitchDataStorage extends Models.Document, TwitchData {}

export interface UserData extends Models.Session, TwitchDataStorage {}


export interface sessionData extends Models.Session, TwitchDataStorage {}