import { Client, Databases, Storage, Teams, Users } from "node-appwrite";

const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!).setKey(process.env.FRONTEND_API_KEY);
const database = new Databases(client);
const storage = new Storage(client);
const team = new Teams(client);
const user = new Users(client);

export { client, database, storage, team, user};
