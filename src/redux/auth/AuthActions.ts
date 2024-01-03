import { RootState } from "@/app/store";
import { account, database } from "@/lib/appwrite";
import { databases } from "@/lib/constants";
import { TwitchDataStorage, UserData } from "@/types/database/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Models } from "appwrite";

interface UserState {
  userData: TwitchDataStorage;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

export const getSessionData = createAsyncThunk<Models.Session, void, { state: RootState }>("auth/session", async (_, { dispatch, getState }) => {
  try {
    //get the session
    const session = await account.getSession("current");

    //check if there is a session
    if (!session) {
      throw new Error("No session found");
    }

  

    //


    return session;
  } catch (error: any) {
    console.log(error);
    throw "whoops looks like you are not logged in";
  }
});

//logout the user
export const logoutUser = createAsyncThunk<void, void, { state: RootState }>("auth/logoutUser", async (_, { dispatch }) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log("logout user")
      // Perform any asynchronous tasks before logout (e.g., API requests, data clearing)

      await account.deleteSession("current");
      // Clear any local storage or perform cleanup tasks

      // Dispatch the logout action to reset user data
  

      // Resolve the promise to indicate successful logout
      resolve();
    } catch (error) {
      // Handle any errors
      console.error("Logout error:", error);
      reject(error);
    }
  });
});

//fetch the twitch data
export const fetchTwitchData = createAsyncThunk<TwitchDataStorage, void, { state: RootState }>(
  "auth/fetchTwitchData",
  async (_, { dispatch, getState }) => {
    console.log("fetching twitch data");
    const { auth } = getState(); // Get the authentication state
    if (!auth.isAuthenticated) {
      throw new Error("User is not authenticated."); // Ensure the user is authenticated
    }

    try {
      // Fetch Twitch data here, e.g., using fetch or Axios
      const TwitchData = await database.listDocuments<TwitchDataStorage>(databases.twitch.databaseID, databases.twitch.collections.User);
      console.log(TwitchData.documents[0]);
      return TwitchData.documents[0]; // Assuming TwitchData is an object with a 'documents' property containing an array
    } catch (error) {
      throw error;
    }
  }
);
