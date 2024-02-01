import React from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import SocialIcon from "./SocialIcon";
import { account } from "@/utils/clientAppwrite";

interface TwitchLoginProps {
  redirect: string | null;
}

export default function TwitchLogin({ redirect }: TwitchLoginProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const scopes = [
    "clips:edit",
    "moderator:read:followers",
    "user:read:email",
    "user:read:follows",
    "user:read:subscriptions",
    "channel:manage:schedule",
    "channel:manage:raids",
    "user:read:moderated_channels"
  ];

  function handleLogin() {
    account.createOAuth2Session("twitch", `http://10.10.10.250:3000${redirect ? redirect : "/admin"}`, "http://localhost:3000/error", scopes);
  }

  return (
    <Button variant="outline" type="button" disabled={isLoading} onClick={handleLogin}>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <span className="mr-2 h-4 w-4 flex justify-center items-center">
          <SocialIcon value="twitch" />
        </span>
      )}{" "}
      Twitch
    </Button>
  );
}
