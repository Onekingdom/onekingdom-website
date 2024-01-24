import { defaultConfig } from "next/dist/server/config-shared";

export enum UserlevelEnum {
  Everyone = "everyone",
  Follower = "follower",
  Vip = "vip",
  Founder = "founder",
  Subscriber = "subscriber",
  Moderator = "moderator",
  Broadcaster = "broadcaster",
  Verified = "verified",
  Prime = "prime",
  Artist = "artist",
  TwitchStaff = "staff",
}
//returns an array of the values of the userlevels enum
export const UserlevelValue: string[] = Object.values(UserlevelEnum);

//returns an array of the keys and values of the userlevels enum
export const Userlevel: { label: string; value: string }[] = Object.keys(UserlevelEnum).map((key) => ({
  label: key,
  value: UserlevelEnum[key as keyof typeof UserlevelEnum],
}));

//returns the value of the userlevel enum based on the key
export const findKeyByValue = (value: string) => {
  for (const [key, val] of Object.entries(UserlevelEnum)) {
    if (val === value) {
      return key;
    }
  }
  return;
};

//the twitch scopes needed for the streamwizard
export const scopes: string[] = ["channel:manage:redemptions", "channel:read:redemptions"];

//returns the value for a spedific database and collection
export const databases = {
  UserIntegrations: {
    databaseID: "64e75b50349d812acde7",
    collections: {
      integrations: "6560bd959d2ae5b6707c",
      spotify: "64e75b569ae75804e330"
    }
  },


  spotifyIntegration: {
    databaseID: "64eea021e0e4804e0d0e",
    collections: {
      streamserSettings: "64eea13235071b511823",
      bannedViewers: "64f3e217f07063ad99a4",
      bannedSongs: "64eea036557408b933af",
      queue: "6527f88ebc9707f8bab2"
    },
  },
  channelPoints: {
    databaseID: "64f5a59d96ce3e17ffe2",
    collections: {
      channelpoints: "6572f76bf3d8db0c4a95",
      actions: "6572f77c4519123a2d9c",
    },
  },

  commands: {
    databaseID: "643e77f341e4deeac803",
    //collection for commands is the twitch channelID or teamID
  },

  overlay: {
    databaseID: "6548d45fd1659e2b09fa",
    collections: {
      widgets: "6548d5c2ac833f2008ff",
      overlays: "6548d5bb32ebc61453db",
    },
  },

  twitch: {
    databaseID: "65afdd18a67ce0ea7b96",
    collections: {
      ClosedBeta: "65079d866c8f2ad4d8e8",
      User: "65afdd31d1222a19ecfc",
    },
  },
};

//returns the value for the discord server
export const DiscordServerLink = "https://discord.gg/gjQgv8GGKn";

//returns the url for the default page
export const defaultPage = "/dashboard/twitch/commands";

export const baseURl = process.env.NEXT_PUBLIC_BASE_URL

export const spotifyRedirectURL = baseURl + "/api/spotify/callback"




export const SpotifyScopes = []