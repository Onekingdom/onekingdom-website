"use client";
import axios, { RawAxiosRequestHeaders } from "axios";
import store from "@/app/store";
import { Models } from "appwrite";
import { account } from "@/lib/clientAppwrite";
import { updateAccessToken } from "@/redux/auth/authSlice";

const TwitchAPI = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
  },
});

//Twitch Api request interceptor to add the token from redux to the requestku
TwitchAPI.interceptors.request.use(
  (request) => {
    const accessToken = store.getState().auth.session.providerAccessToken
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

//twitch response interceptor
TwitchAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  //handle response error
  async function (error) {
    //originalRequest
    const originalRequest = error.config;

    //if the error status = 401 we update the token and retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      //create a temporary jwt for appwrite on the user behalf
      const JWT = await account.createJWT();

      //get the new token from nextjs api
      const newToken = await RefreshToken(JWT);

      error.config.headers = JSON.parse(JSON.stringify(error.config.headers || {})) as RawAxiosRequestHeaders;

      if (newToken) {
        //update the token in rexux
        store.dispatch(updateAccessToken(newToken));
      }

      //make the new request
      const res = TwitchAPI(originalRequest);

      return res;
    }
    return Promise.reject(error);
  }
);

export { TwitchAPI };

//refresh the token if it is expired
async function RefreshToken(JWT: Models.Jwt): Promise<string | undefined> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/twitch/refresh_token`, {
      headers: {
        Authorization: `${JWT.jwt}`,
      },
    });
    return response.data.AccessToken;
  } catch (error) {
    console.log(error);
  }
}