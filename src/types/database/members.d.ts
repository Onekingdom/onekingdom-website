import { Models } from "appwrite";

export interface Member {
    name: string;
    description: string;
    image?: imageStorage 
    socialMedia: {
        value: string;
        href: string;
    }[];
    partneredStreamer: boolean;
    staffMember: boolean;
}



export interface memberStorage extends Member, Models.Document {} 
export interface imageStorage extends Models.Document {
    bucketID: string;
    imageID: string;
}