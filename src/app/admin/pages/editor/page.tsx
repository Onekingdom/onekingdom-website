"use client";

import PageEditor from "@/components/pageEditor/editor";
import PageEditorNavigation from "@/components/pageEditor/page-editor-navigation";
import PageEditorSidebar from "@/components/pageEditor/page-editor-sidebar";
import useEditor from "@/hooks/useEditor";
import usePageEditor from "@/hooks/usePageEditor";
import { cn } from "@/lib/utils";

import { PageDetails } from "@/types/pageEditor";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParmas = useSearchParams();
  const [pageDetails, setPageDetails] = useState<PageDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const { getPageDetails } = usePageEditor();
  const pageID = searchParmas.get("pageID");
  const { state } = useEditor();

  if (!pageID) throw new Error("Page ID is required");

  useEffect(() => {
    const getPage = async () => {
      try {
        const response = await getPageDetails(pageID);
        setPageDetails({
          $id: response.$id,
          content: response.content,
          createdAt: response.createdAt,
          name: response.name,
          order: response.order,
          pathName: response.pathName,
          previewImage: response.previewImage,
          updatedAt: response.updatedAt,
          visits: response.visits,
        });
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPage();
  }, [searchParmas]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pageDetails) {
    throw new Error("page could not be found");
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background " suppressContentEditableWarning={true} suppressHydrationWarning>
      <PageEditorNavigation PageDetails={pageDetails} />
      <div className={cn("h-full flex justify-center")}>
        <PageEditor pageDetails={pageDetails} liveMode={false} />
      </div>
      <PageEditorSidebar />
    </div>
  );
}
