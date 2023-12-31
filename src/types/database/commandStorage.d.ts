import { Models } from "appwrite";
import { Command } from "../command";


//single document for a streamers command
export interface CommandStorage extends Models.Document, Command {}

//list of all commands
export interface CommandsStorage extends Models.DocumentList<CommandStorage> {}
