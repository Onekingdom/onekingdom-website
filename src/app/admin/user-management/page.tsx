"use client";
import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useEvents from "@/hooks/useEvents";
import useTeams from "@/hooks/useTeams";

import TeamInvite from "@/components/teamInvite";
import { EventStorage } from "@/types/events";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Models } from "appwrite";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { events, deleteEvent } = useEvents();
  const { members } = useTeams();
  const [modal, setModal] = useState<boolean>(false);

  const columns: ColumnDef<Models.Membership>[] = [
    {
      id: "name",
      accessorKey: "userName",
      header: "Name",
      size: 100,
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },

    {
      accessorKey: "roles",
      header: "Roles",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {row.original.roles.map((role) => {
              return <span className="capitalize">{role}</span>;
            })}
          </div>
        );
      },
      size: 100,
    },
    {
      accessorKey: "joined",
      header: "joined",
      cell: ({ row }) => {
        return <div className="font-medium">{new Date(row.original.joined).toLocaleDateString()}</div>;
      },
      size: 100,
    },
    {
      accessorKey: "confirm",
      header: "confirmed",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {row.original.confirm ? <span className="text-green-500">Confirmed</span> : <span className="text-red-500">Not Confirmed</span>}
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
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Link href={`/admin/events/edit/${row.original.$id}`}>
                <DropdownMenuItem
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Update Roles
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={async (e) => {
                  e.preventDefault();
                  // await removeEvent(row.original);
                }}
              >
                Remove From Team
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
            <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Invite User</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Invite User</DialogTitle>
                  <DialogDescription>The user has to be recognized by the system</DialogDescription>
                </DialogHeader>
                <TeamInvite />
                {/* <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter> */}
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <DataTable
          columnData={members ? members : []}
          columns={columns}
          filter={{
            filterID: "name",
            placeholder: "Filter events...",
          }}
        />
      </div>
    </>
  );
}
