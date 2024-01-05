import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "@/redux/auth/authSlice";
import pageBuilderReducer from "@/redux/pageBuilder/PageBuilderSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    pageBuilder: pageBuilderReducer,

  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
