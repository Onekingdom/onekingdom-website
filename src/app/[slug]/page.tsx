import PageEditor from "@/components/pageEditor/editor";
import { databases } from "@/lib/constants";
import { PageDetailStorage } from "@/types/database/pages";
import { database } from "@/utils/serverAppwrite";
import { notFound } from "next/navigation";
import { Query } from "node-appwrite";

async function getPageDetails(slug: string): Promise<PageDetailStorage | null> {
  const { pages } = databases;
  const res = await database.listDocuments<PageDetailStorage>(pages.databaseID, pages.collectionID, [Query.equal("pathName", `/${slug}`)]);

  if (res.documents.length === 0) {
    return null;
  }

  return res.documents[0];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pageDetails = await getPageDetails(params.slug);

  if (!pageDetails || !pageDetails.published) {
    return notFound();
  }

  return <PageEditor pageDetails={pageDetails} liveMode />;
}
