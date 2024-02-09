import { NextResponse } from "next/server";
import { user } from "@/utils/serverAppwrite";
import { Client, Teams } from "node-appwrite";

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
    statusText: "Unauthorized - No Token",
  },
  NO_MEMBERSHIPID: {
    status: 400,
    statusText: "Bad Request - No Membership ID",
  },
};

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization");
    const { searchParams } = new URL(request.url);
    const membershipID = searchParams.get("membershipID");

    //check if token exists
    if (!token) {
      throw ERROR_MESSAGES.NO_TOKEN;
    }

    //check if we have membershipID
    if (!membershipID) {
      throw ERROR_MESSAGES.NO_MEMBERSHIPID;
    }

    const client = new Client();
    client.setEndpoint("https://appwrite.amrio.nl/v1").setProject("658fab9280f434656e3b").setJWT(token);

    const team = new Teams(client);

    //check if the user is in onekingdom team
    const getMember = async () => {
      try {
        return await team.getMembership("65ad8a8a0a403b18c51b", membershipID);
      } catch (error: any) {
        console.log(error);
        throw {
          status: error.code,
          statusText: error.type,
        };
      }
    };

    const member = await getMember();

    //check if the member exists
    if (!member) {
      throw new Error("You are not a member of OneKingdom Team");
    }

    //check if the member is an owner
    if (member.roles[0] !== "owner") {
      throw new Error("You are not an owner of OneKingdom Team");
    }

    //get all users
    const users = await user.list();

    //return user list
    return NextResponse.json(users);
  } catch (err: any) {
    console.log(err); // Log the error for debugging purposes

    return NextResponse.json(err.statusText, { status: err.status });
  }
}


export const dynamic = 'force-dynamic'