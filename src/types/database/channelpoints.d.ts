import { Models } from "appwrite";

export interface ChannelPointStorage extends channelpointsDB, Models.Document {}

export interface channelpointsDB {
  channelPointID: string;
  channelID: string;
  actions?: channelpointActions[];
}

export interface channelpointActions {
  action: string;
  message: string;
  name: string;
  $id: string;
}
