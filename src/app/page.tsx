import PageEditor from "@/components/pageEditor/editor";
import { PageDetailStorage } from "@/types/database/pages";
import { database } from "@/utils/serverAppwrite";
import React from "react";

async function FetchHome() {
  const res = await database.getDocument<PageDetailStorage>("658fabb7b076a84d06d2", "65cf612a10b631f9d906", "65f03006671385ca208e");

  return res;
}

export default async function Page() {
  const page = await FetchHome();



  return <PageEditor pageDetails={page}  liveMode/>
}
