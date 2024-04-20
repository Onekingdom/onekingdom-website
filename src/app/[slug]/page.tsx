import PageEditor from "@/components/pageEditor/editor";
import { databases } from "@/lib/constants";
import { PageDetailStorage } from "@/types/database/pages";
import { database } from "@/utils/serverAppwrite";
import { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import { Query } from "node-appwrite";

async function getPageDetails(slug: string): Promise<PageDetailStorage | null> {
  const query = encodeURIComponent(`equal("slug","about")`);

  // Construct the URL with the encoded query
  const url = `https://appwrite.jochemwhite.nl/v1/databases/658fabb7b076a84d06d2/collections/65cf612a10b631f9d906/documents?queries[]=equal("pathName", [/${slug}])`;

  const res = await fetch(url, {
    headers: {
      "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  const data = await res.json();

  if (data.documents.length === 0) {
    return null;
  }

  const pageDetails = data.documents[0] as PageDetailStorage;

  if (!pageDetails.published) {
    return null;
  }

  return data.documents[0] as PageDetailStorage;
}


export default async function Page({ params }: { params: { slug: string } }) {
  const pageDetails = await getPageDetails(params.slug);

  if (!pageDetails || !pageDetails.published) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{pageDetails.title}</title>
        <meta name="description" content={pageDetails.description} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </Head>
      <PageEditor pageDetails={pageDetails} liveMode />;
    </>
  );
}
