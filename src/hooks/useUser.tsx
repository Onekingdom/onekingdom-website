import React, { use, useEffect, useState } from "react";
import { useAppSelector } from "./redux";
import axios from "axios";
import { account } from "@/utils/clientAppwrite";
import useTeams from "./useTeams";
import { Models } from "node-appwrite";
import { baseURl } from "@/lib/constants";

export default function useUser() {
  const { session } = useAppSelector((state) => state.auth);
  const { getMemberbyID } = useTeams();
  const [users, setUsers] = useState<Models.UserList<Models.Preferences>>();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    //get membershipID
    const { memberships } = await getMemberbyID(session.userId);

    try {
      const res = await axios.get<Models.UserList<Models.Preferences>>(
        `http://${baseURl}/api/appwrite/list_users?membershipID=${memberships[0].$id}`,
        {
          headers: {
            authorization: (await account.createJWT()).jwt,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return { users };
}
