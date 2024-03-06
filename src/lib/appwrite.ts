"use client";
import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!); 

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);


export { client, account, database, storage };
