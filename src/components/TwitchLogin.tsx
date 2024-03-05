import React from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import SocialIcon from "./SocialIcon";
import { account } from "@/utils/clientAppwrite";
import { baseURl } from "@/lib/constants";

interface TwitchLoginProps {
  redirect: string | null;
}

export default function TwitchLogin({ redirect }: TwitchLoginProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const scopes: string[] = [
    "bits:read", // View Bits information for a channel.
    "channel:manage:ads", // Manage ads schedule on a channel.
    "channel:read:ads", // Read the ads schedule and details on your channel.
    "channel:manage:broadcast", // Manage a channel’s broadcast configuration, including updating channel configuration and managing stream markers and stream tags.
    "channel:read:charity", // Read charity campaign details and user donations on your channel.
    "channel:edit:commercial", // Run commercials on a channel.
    "channel:read:editors", // View a list of users with the editor role for a channel.
    "channel:manage:extensions", // Manage a channel’s Extension configuration, including activating Extensions.
    "channel:read:goals", // View Creator Goals for a channel.
    "channel:read:guest_star", // Read Guest Star details for your channel.
    "channel:manage:guest_star", // Manage Guest Star for your channel.
    "channel:read:hype_train", // View Hype Train information for a channel.
    "channel:manage:moderators", // Add or remove the moderator role from users in your channel.
    "channel:read:polls", // View a channel’s polls.
    "channel:manage:polls", // Manage a channel’s polls.
    "channel:read:predictions", // View a channel’s Channel Points Predictions.
    "channel:manage:predictions", // Manage of channel’s Channel Points Predictions
    "channel:manage:raids", // Manage a channel raiding another channel.
    "channel:read:redemptions", // View Channel Points custom rewards and their redemptions on a channel.
    "channel:manage:redemptions", // Manage Channel Points custom rewards and their redemptions on a channel.
    "channel:manage:schedule", // Manage a channel’s stream schedule.
    "channel:read:subscriptions", // View a list of all subscribers to a channel and check if a user is subscribed to a channel.
    "channel:manage:videos", // Manage a channel’s videos, including deleting videos.
    "channel:read:vips", // Read the list of VIPs in your channel.
    "channel:manage:vips", // Add or remove the VIP role from users in your channel.
    "clips:edit", // Manage Clips for a channel.
    "moderation:read", // View a channel’s moderation data including Moderators, Bans, Timeouts, and Automod settings.
    "moderator:manage:announcements", // Send announcements in channels where you have the moderator role.
    "moderator:manage:automod", // Manage messages held for review by AutoMod in channels where you are a moderator.
    "moderator:read:automod_settings", // View a broadcaster’s AutoMod settings.
    "moderator:manage:automod_settings", // Manage a broadcaster’s AutoMod settings.
    "moderator:manage:banned_users", // Ban and unban users.
    "moderator:read:blocked_terms", // View a broadcaster’s list of blocked terms.
    "moderator:manage:blocked_terms", // Manage a broadcaster’s list of blocked terms.
    "moderator:manage:chat_messages", // Delete chat messages in channels where you have the moderator role.
    "moderator:read:chat_settings", // View a broadcaster’s chat room settings.
    "moderator:manage:chat_settings", // Manage a broadcaster’s chat room settings.
    "moderator:read:chatters", // View the chatters in a broadcaster’s chat room.
    "moderator:read:followers", // Read the followers of a broadcaster.
    "moderator:read:guest_star", // Read Guest Star details for channels where you are a Guest Star moderator.
    "moderator:manage:guest_star", // Manage Guest Star for channels where you are a Guest Star moderator.
    "moderator:read:shield_mode", // View a broadcaster’s Shield Mode status.
    "moderator:manage:shield_mode", // Manage a broadcaster’s Shield Mode status.
    "moderator:read:shoutouts", // View a broadcaster’s shoutouts.
    "moderator:manage:shoutouts", // Manage a broadcaster’s shoutouts.
    "user:edit", // Manage a user object.
    "user:edit:follows", // Deprecated. Was previously used for “Create User Follows” and “Delete User Follows.” See Deprecation of Create and Delete Follows API Endpoints.
    "user:read:blocked_users", // View the block list of a user.
    "user:manage:blocked_users", // Manage the block list of a user.
    "user:read:broadcast", // View a user’s broadcasting configuration, including Extension configurations.
    "user:manage:chat_color", // Update the color used for the user’s name in chat.Update User Chat Color
    "user:read:email", // View a user’s email address.
    "user:read:follows", // View the list of channels a user follows.
    "user:read:moderated_channels", // Read the list of channels you have moderator privileges in.
    "user:read:subscriptions", // View if an authorized user is subscribed to specific channels.
    "channel:bot",
    "channel:moderate",
    "user:bot",
    "user:read:chat",
    "user:write:chat",
    
  ];
  function handleLogin() {
    account.createOAuth2Session("twitch", `${baseURl}${redirect ? redirect : "/admin"}`, `${baseURl}/error`, scopes);
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
