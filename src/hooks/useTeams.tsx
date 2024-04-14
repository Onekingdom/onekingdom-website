import React, { useEffect, useState } from "react";
import { team } from "@@/lib/clientAppwrite";
import { Models, Query } from "appwrite";

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

  async function getMemberbyID(id: string) {
    const res = await team.listMemberships(onekingdom, [
      Query.equal("userId", id),
    ]);
    return res;
  }

  //add a new memeber to the team
  async function addMember(userID: string) {
    const res = await team.createMembership(onekingdom, ["Mod"], undefined, userID, undefined, "http://10.10.10.250:3000/admin?teaminvite=true");
    return res;
  }

  //accept invite
  async function acceptInvite(teamID: string, membershipID: string, userID: string, secret: string) {
    const res = await team.updateMembershipStatus(teamID, membershipID, userID, secret,);
    return res;
  }


  return { members, getMemberbyID, addMember, acceptInvite };
}
