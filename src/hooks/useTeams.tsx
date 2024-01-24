import React, { useEffect, useState } from "react";
import { team } from "@/utils/clientAppwrite";
import { Models } from "appwrite";

const onekingdom = "65ad8a8a0a403b18c51b";
export default function useTeams() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Models.Membership[]>([]);

  useEffect(() => {
    Members();
  }, []);

  async function Members() {
    const { memberships } = await team.listMemberships(onekingdom);
    // console.log(memberships);
    setMembers(memberships);
    setLoading(false);
  }

  return { members };
}
