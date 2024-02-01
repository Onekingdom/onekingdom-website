import sdk from "node-appwrite";
import { NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";
import { TwitchDataStorage } from "@/types/database/user";
import { RefreshTokenResponse } from "@/types/API/twitch";
import { database } from "@/utils/serverAppwrite";
import { databases } from "@/lib/constants";

interface Error {
  status: number;
  statusText: string;
}

let error: Error | null = null;

const ERROR_MESSAGES = {
  CONNECT_FAILED: {
    status: 500,
    statusText: "Internal Server Error",
  },
  NO_TOKEN: {
    status: 401,
    statusText: "Unauthorized",
  },
  NO_SPOTIFY_USER: {
    status: 404,
    statusText: "User Not Found in Database",
  },
};

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization");

    if (!token) {
      throw new Error(ERROR_MESSAGES.NO_TOKEN.statusText);
    }



    const twitchUserData = await database.listDocuments<TwitchDataStorage>(databases.twitch.databaseID, databases.twitch.collections.User);

    if (!twitchUserData || twitchUserData.total === 0) {
      throw new Error("No Twitch user found in the database");
    }

    const TwitchUser = twitchUserData.documents.at(0);

    if (!TwitchUser) {
      throw new Error(ERROR_MESSAGES.NO_SPOTIFY_USER.statusText);
    }

    const TwitchResponse = await axios.post<RefreshTokenResponse>(
      "https://id.twitch.tv/oauth2/token?" +
        qs.stringify({
          client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: TwitchUser.refreshToken,
        })
    );

    if (!TwitchResponse) {
      throw new Error(ERROR_MESSAGES.CONNECT_FAILED.statusText);
    }

    const updatedDB = await database.updateDocument(databases.twitch.databaseID, databases.twitch.collections.User, TwitchUser.$id, {
      accessToken: TwitchResponse.data.access_token,
    });

    return NextResponse.json({ AccessToken: TwitchResponse.data.access_token }, { status: 200 });
  } catch (err: any) {
    console.error(err); // Log the error for debugging purposes

    return NextResponse.json({ error: ERROR_MESSAGES.CONNECT_FAILED.statusText }, { status: ERROR_MESSAGES.CONNECT_FAILED.status });
  }
}

export const dynamic = 'force-dynamic'