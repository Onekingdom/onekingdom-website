import PageEditor from "@/components/pageEditor/editor";
import { PageDetailStorage } from "@/types/database/pages";
import { database } from "@/utils/serverAppwrite";
import React from "react";

async function FetchHome() {
  const res = await fetch(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT! + `/databases/658fabb7b076a84d06d2/collections/65cf612a10b631f9d906/documents/660446fe1b02c8f8233a`, {
    headers: {
      "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!,
    },
     cache: "no-cache",
  });


  return res.json() as Promise<PageDetailStorage>;
}

export default async function Page() {
  const page = await FetchHome();





  return <PageEditor pageDetails={page}  liveMode/>
}
