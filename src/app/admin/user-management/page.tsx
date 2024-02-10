"use client";
import DataTable from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { TeamInvite } from "@/components/teamInvite";
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

import { EventStorage } from "@/types/events";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Models } from "appwrite";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function Page() {
  const { events, deleteEvent } = useEvents();
  const { members, addMember  } = useTeams();
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
            {row.original.roles.map((role, index) => {
              return <span key={index} className="capitalize">{role}</span>;
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

  async function handleInvite(user: Models.User<Models.Preferences>) {
    //check if the user is already in the onekingdom team

    const x = members.find((member) => member.userId === user.$id);

    if (x) {
      toast.custom((t) => (
        <div className="bg-white rounded-sm w-96 h">
          <Image src="/memes/bugs.jpg" alt="Master Mo" fill/>
          <div className="p-4 bg-black">
            <h2 className="text-lg font-bold">User already in team</h2>
            <p className="text-sm text-gray-500">The user is already in the team</p>
        I</div>
        </div>
      ));
      return;
    }

    await addMember(user.$id);



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
                <TeamInvite handleInvite={handleInvite}  />
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
