"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getSessionData } from "@/redux/auth/AuthActions";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
type DashboardLayout = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayout) {
  const { session, loading, isAuthenticated, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await dispatch(getSessionData());

      if (!isAuthenticated && loading === "succeeded") {
        handleUnauthorized();
      }
    };

    console.log("isAuthenticated", isAuthenticated);

    init();
  }, [isAuthenticated]);

  if (loading === "loading") {
    // return <Loading />;
    return <h1>Loading...</h1>;
  }

  function handleUnauthorized() {
    router.push("/login?redirect=/dashboard&unauthorized=true");
  }

  return <div>{children}</div>;
}
