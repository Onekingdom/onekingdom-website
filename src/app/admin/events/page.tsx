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

import { EventStorage } from "@/types/events";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { events, deleteEvent } = useEvents();
  const [modal, setModal] = useState<boolean>(false);

  const columns: ColumnDef<EventStorage>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      size: 100,
      cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
    },

    {
      accessorKey: "eventDate",
      header: () => <div>Event Date</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {new Date(row.getValue("eventDate")).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        );
      },
      size: 100,
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

              <DropdownMenuItem
                onClick={() => {
                  setModal(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async (e) => {
                  e.preventDefault();
                  // await removeCommand(row.original);
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

  async function removeEvent(event: EventStorage) {
    toast.promise(
      async () => {
        try {
          const res = await deleteEvent(event.$id);
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      {
        loading: `removing command ${event.title}`,
        success(data) {
          return `${event.title} has been removed`;
        },
        error: `failed to remove command ${event.title}`,
      }
    );
  }

  return (
    <>
      <div className="hidden h-full border rounded flex-1 flex-col p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Events</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/admin/events/new">
              <Button variant="outline">Add Event</Button>
            </Link>
          </div>
        </div>
        <DataTable
          columnData={events ? events.documents : []}
          columns={columns}
          filter={{
            filterID: "title",
            placeholder: "Filter events...",
          }}
        />
      </div>
    </>
  );
}
