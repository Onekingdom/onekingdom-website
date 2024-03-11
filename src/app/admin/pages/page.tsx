"use client";
import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import usePageEditor from "@/hooks/usePageEditor";
import { PageDetailStorage } from "@/types/database/pages";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NewPageForm from "@/components/forms/new-page-form";

export default function Page() {
  const [pages, setPages] = useState<PageDetailStorage[]>([]);
  const { getAllPages, deletePage } = usePageEditor();

  useEffect(() => {
    async function fetchPages() {
      const res = await getAllPages();
      if (res) setPages(res.documents);
    }
    fetchPages();
  }, [setPages]);

  async function removePage(event: PageDetailStorage) {
    try {
      await deletePage(event.$id);
      toast.success("Member deleted");
      setPages((pages) => pages.filter((page) => page.$id !== event.$id));
    } catch (error) {
      toast.error("Error deleting member");
    }
  }

  const columns: ColumnDef<PageDetailStorage>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Page Name",
      size: 100,
      cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    },

    {
      accessorKey: "pathName",
      header: () => <div>Path</div>,
      cell: ({ row }) => {
        return <div className="font-medium">/{row.getValue("pathName")}</div>;
      },
    },

    {
      accessorKey: "Last Updated",
      header: () => <div>Last Updated</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {new Date(row.original.$updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        );
      },
      size: 100,
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div>Actions</div>,
      size: 10,
      cell: ({ row }) => {
        const { loading } = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading}>
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Link href={`/admin/pages/editor/?pageID=${row.original.$id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={async (e) => {
                  e.preventDefault();
                  await removePage(row.original);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  1;
  return (
    <div className="hidden h-full border rounded flex-1 flex-col p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pages</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">New Page</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Page Details</DialogTitle>
                <DialogDescription>You will be redirect to the page editor.</DialogDescription>
              </DialogHeader>
                <NewPageForm />

            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DataTable
        columnData={pages ? pages : []}
        columns={columns}
        filter={{
          filterID: "name",
          placeholder: "Filter Pages...",
        }}
      />
    </div>
  );
}
