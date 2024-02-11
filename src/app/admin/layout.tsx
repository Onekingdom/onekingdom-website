"use client";
import { useEffect, type ReactNode } from "react";
import { toast } from "sonner";

import { SidebarNav } from "@/components/nav/SidebarNav";
import { Breadcrumb } from "@/components/nav/breadcrumb";
import { DashboardNav } from "@/components/nav/dashboardNav";
import Sidebar from "@/components/nav/sidebar";
import { dashboardConfig } from "@/config/dashboard";
import { databases } from "@/lib/constants";
import { client } from "@/utils/clientAppwrite";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getSessionData } from "../../redux/auth/AuthActions";
import NotFound from "@/components/no-access";
import useTeams from "@/hooks/useTeams";

type DashboardLayout = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayout) {
  const { session, loading } = useAppSelector((state) => state.auth);
  // const { acceptInvite } = useTeams();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const init = async () => {
    const res = await dispatch(getSessionData());

    // try {
    //   client.subscribe(`databases.${databases.commands.databaseID}.collections.${session.channelID}.documents`, (response: any) => {
    //     if (response.events.includes(`databases.${databases.commands.databaseID}.collections.${session.channelID}.documents.*.delete`)) {
    //       toast.success(`${response.payload.command} has been removed`);
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    if (searchParams.has("teaminvite")) {
      //check if we have all the params
      const teamID = searchParams.get("teamID");
      const membershipID = searchParams.get("membershipID");
      const userID = searchParams.get("userID");
      const secret = searchParams.get("secret");

      // if (teamID && membershipID && userID && secret) {
      //   //accept the invite
      //   try {
      //     await acceptInvite(teamID, membershipID, userID, secret);
      //     toast.success("You have joined the team");
      //     router.push("/admin");
      //   } catch (error) {
      //     toast.error("Something went wrong, please try again later.");
      //   }
      // }
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (loading === "loading") {
    // return <Loading />;
    return <h1>Loading...</h1>;
  }

  if (loading === "failed") {
    return <NotFound />;
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarNav config={dashboardConfig} />
      </Sidebar>
      <div className="w-full">
        <DashboardNav />
        <div className="h-[calc(100vh-60px)] overflow-x-hidden  pb-10">
          <Breadcrumb />
          <div className="mx-auto px-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
