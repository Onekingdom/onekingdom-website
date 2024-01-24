import { TwitchAPI } from "@/axios/twitch";
import { ChannelSearchResult, ChannelSearchResults } from "@/types/API/twitch";
import { useState } from "react";

export default function useSearchChannel() {
  const [results, setResults] = useState<ChannelSearchResult[]>([]);


  //search for a Twitch channel
  async function searchChannel(channel: string) {
    try {
      const res = await TwitchAPI.get<ChannelSearchResults>(`/search/channels?query=${channel}`);
      setResults(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return { searchChannel, results };
}
