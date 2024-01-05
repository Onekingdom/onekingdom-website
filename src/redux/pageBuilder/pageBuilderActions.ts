import { RootState } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const PublishPage = createAsyncThunk<any, void, { state: RootState }>("auth/fetchTwitchData", async (_, { dispatch, getState }) => {});


export const UpdatePageContent = createAsyncThunk<any, void, { state: RootState }>("auth/fetchTwitchData", async (_, { dispatch, getState }) => {});
