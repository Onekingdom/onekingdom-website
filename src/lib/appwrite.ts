"use client";
import { Client, Databases, Account } from "appwrite";

const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!); 

const account = new Account(client);
const database = new Databases(client);


export { client, account, database };
