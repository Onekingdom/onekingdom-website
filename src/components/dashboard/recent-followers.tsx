"use client";
import { TwitchAPI } from "@/axios/twitch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/redux";
import { getChannelFollowersResponse, getTwitchUserResponse } from "@/types/API/twitch";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

export default function RecentFollowers() {
  const [followers, setFollowers] = useState<
    {
      user_name: string;
      profile_image_url: string;
      follow_date: string;
      broadcaster_type: string;
    }[]
  >();


  const [loading, setLoading] = useState(true);
  const { session } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const follwersRes = await TwitchAPI.get<getChannelFollowersResponse>(`/channels/followers?broadcaster_id=${session.channelID}&first=6`);

        const userIDs = follwersRes.data.data.map((follwersRes) => follwersRes.user_id).join("&id=");

        const users = await TwitchAPI.get<getTwitchUserResponse>(`/users?id=${userIDs}`);

        const followers = users.data.data.map((user) => {
          const follower = follwersRes.data.data.find((follower) => follower.user_id === user.id);
          return {
            user_name: user.display_name,
            profile_image_url: user.profile_image_url,
            follow_date: follower!.followed_at,
            broadcaster_type: user.broadcaster_type,
          };
        });

        // Sort followers based on follow date
        followers.sort((a, b) => new Date(b.follow_date).getTime() - new Date(a.follow_date).getTime());

        setFollowers(followers);
        setLoading(false);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    getFollowers();
  }, [session.channelID]);



  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Followers</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 ">
        {loading
          ? [...Array(6)].map((_, index) => (
              <div className="flex flex-row items-center gap-4 w-full">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="w-full">
                  <Skeleton className="h-4 w-96" />
                  <Skeleton className="h-3 w-44 mt-2" />
                </div>
              </div>
            )) // 6 followers
          : followers?.map((follower) => (
              <div key={follower.user_name} className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={follower.profile_image_url} alt={follower.user_name} />
                  <AvatarFallback>{follower.user_name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{follower.user_name}</div>
                  <p className="text-muted-foreground text-xs">{follower.broadcaster_type}</p>
                </div>
              </div>
            ))}
      </CardContent>
    </Card>
  );
}
