import { Client, Databases } from "node-appwrite";

const client = new Client();
client.setEndpoint("https://appwrite.amrio.nl/v1").setProject("658fab9280f434656e3b").setKey(process.env.FRONTEND_API_KEY);
const database = new Databases(client);



export { client, database}
