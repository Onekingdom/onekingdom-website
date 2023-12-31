import { Models } from "node-appwrite";


interface Trigger extends Models.Document {
  channelID: number;
  triggerType: string;
  triggerValue: string;
  scripts: scripts;
}

export interface Scripts extends Models.Document {
  name: string;
  enabled: boolean;
  description: string;
  triggers: Trigger[];
  actions: actions[];
}

interface actions extends Models.Document {
  actionType: string;
  actionValue: string;
  channelID: number;
  scripts: scripts[];
}
