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
import useEvents from "@/hooks/useEvents";
import useMembers from "@/hooks/useMembers";
import { memberStorage } from "@/types/database/members";

import { EventStorage } from "@/types/events";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { storage } from "@/utils/clientAppwrite";


export default function Page() {
  const [members, setMembers] = useState<memberStorage[]>([]);
  const { getMembers, deleteMember } = useMembers();

  useEffect(() => {
    async function fetchMembers() {
      const res = await getMembers();
      if (res) setMembers(res.documents);
      console.log("res", res);
    }
    fetchMembers();
  }, [setMembers]);




  async function removeMember(event: memberStorage) {
    try {
      await deleteMember(event.$id);
      toast.success("Member deleted");
      setMembers((members) => members.filter((member) => member.$id !== event.$id));
    } catch (error) {
      toast.error("Error deleting member");
    }
  }



  const columns: ColumnDef<memberStorage>[] = [
    {
      accessorKey: "image",
      header: "",
      size: 10,
      cell: ({ row }) => (
        <div className="w-10 h-10 roundobject-cover rounded-full">
          <Avatar>
            <AvatarImage src={storage.getFilePreview(row.original.image.bucketID, row.original.image.imageID).href} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Title",
      size: 100,
      cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    },

    {
      accessorKey: "description",
      header: () => <div>description</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("description")}</div>;
      },
    },
    {
      accessorKey: "partneredStreamer",
      header: () => <div>Partnered Streamer</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("partneredStreamer") ? "Yes" : "No"}</div>;
      },
    },
    {
      accessorKey: "staffMember",
      header: () => <div>Staff Member</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("staffMember") ? "Yes" : "No"}</div>;
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

              <Link href={`/admin/members/edit/?memberID=${row.original.$id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={async (e) => {
                  e.preventDefault();
                  await removeMember(row.original);
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





  1
  return (
    <div className="hidden h-full border rounded flex-1 flex-col p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Members</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/members/edit">
            <Button variant="outline">Add Member</Button>
          </Link>
        </div>
      </div>
      <DataTable
        columnData={members ? members : []}
        columns={columns}
        filter={{
          filterID: "name",
          placeholder: "Filter members...",
        }}
      />
    </div>
  );
}
