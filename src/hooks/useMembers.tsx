import { memberSchemaType } from "@/schemas/member";
import { memberStorage } from "@/types/database/members";
import { database } from "@/utils/clientAppwrite";
import { ID } from "appwrite";
import React from "react";

export default function useMembers() {
  //create a new member
  async function createMember(member: memberSchemaType) {
    try {
      const res = await database.createDocument("658fabb7b076a84d06d2", "65b88761559a4aa41f38", ID.unique(), member);
    } catch (error) {
      console.log(error);
    }
  }

  //get all members
  async function getMembers() {
    try {
      const res = await database.listDocuments<memberStorage>("658fabb7b076a84d06d2", "65b88761559a4aa41f38");

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  //get a member by id
  async function getMemberByID(id: string) {
    try {
      const res = await database.getDocument<memberStorage>("658fabb7b076a84d06d2", "65b88761559a4aa41f38", id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  //update a member
  async function updateMember(id: string, member: memberSchemaType) {
    console.log(member)
    try {
      const res = await database.updateDocument<memberStorage>("658fabb7b076a84d06d2", "65b88761559a4aa41f38", id, member);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getMembers,
    getMemberByID,
    createMember,
    updateMember,
  };
}
