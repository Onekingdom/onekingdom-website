"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "./ui/input";
import useSearchChannel from "@/hooks/useSearchChannel";
import { ChannelSearchResult } from "@/types/API/twitch";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import useUsers from "@/hooks/useUser";
import { Button } from "./ui/button";
import { Models } from "appwrite";


interface Props {
  handleInvite: (user: Models.User<Models.Preferences>) => void;
}

export function TeamInvite({ handleInvite }: Props) {
  const [search, setSearch] = useState("");

  const { users } = useUsers();
  const debouncedSearchTerm = useDebounce(search, 500);
  const { session } = useAppSelector((state) => state.auth);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  // useEffect(() => {
  //   if (!debouncedSearchTerm || debouncedSearchTerm.length < 4) return;

  //   searchChannel(debouncedSearchTerm);
  // }, [debouncedSearchTerm]);



  if (!users) return null;

  return (
    <>
      <Input placeholder="Search user..." onChange={handleChange} />

      <ul>
        {users.users.length > 0 &&
          users.users.map((result) => {
            return (
              <li key={result.$id} className="flex items-center justify-between border rounded-sm my-4">
                <div className="flex items-center">
                  <div className="ml-2">
                    <div className="text-sm font-medium">{result.name}</div>
                  </div>
                </div>
                <div>
                  <Button onClick={() => handleInvite(result)} variant="ghost">
                    Invite
                  </Button>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
