"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "./ui/input";
import useSearchChannel from "@/hooks/useSearchChannel";
import { ChannelSearchResult } from "@/types/API/twitch";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";

export function SearchChannel() {
  const [search, setSearch] = useState("");
  const { results, searchChannel } = useSearchChannel();
  const debouncedSearchTerm = useDebounce(search, 500);
  const { session } = useAppSelector((state) => state.auth);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 4) return;

    searchChannel(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  function handleInvite(channel: ChannelSearchResult) {
    if (+channel.id === session.channelID) {
      toast.custom((t) => (
        <div className="bg-white rounded-sm w-96 h">
          <img src="/memes/bugs.jpg" alt="" />
        </div>
      ));
      return;
    }
  }

  return (
    <>
      <Input placeholder="Search channel..." onChange={handleChange} />

      {results.length > 0 &&
        results.map((result) => {
          return (
            <div key={result.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={result.thumbnail_url} alt={result.display_name} className="w-8 h-8 rounded-full" />
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium">{result.display_name}</div>
                <div className="text-sm text-gray-500">{result.is_live ? "streaming" : ""}</div>
              </div>
              <div>
                <button className="px-2 py-1 text-sm text-white bg-blue-500 rounded " onClick={(e) => handleInvite(result)}>
                  Invite
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}
