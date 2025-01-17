import { database } from "@/lib/clientAppwrite";
import { databases } from "@/lib/constants";
import { PageDetailStorage } from "@/types/database/pages";
import React from "react";
import { ID } from "appwrite";
import { PageDetails } from "@/types/pageEditor";

export default function usePageEditor() {
  const databaseID = databases.pages.databaseID;
  const collectionID = databases.pages.collectionID;

  //get page details
  const getPageDetails = async (PageId: string) => {
    const response = await database.getDocument<PageDetailStorage>(databaseID, collectionID, PageId);

    return response;
  };

  //create new page
  const createNewPage = async (pageDetails: PageDetails) => {
    const response = await database.createDocument<PageDetailStorage>(databaseID, collectionID, ID.unique(), pageDetails);

    return response;
  };

  //update page
  const updatePage = async (pageDetails: PageDetails, $id: string) => {
    const response = await database.updateDocument<PageDetailStorage>(databaseID, collectionID, $id, pageDetails);

    return response;
  };

  //get all pages
  const getAllPages = async () => {
    const response = await database.listDocuments<PageDetailStorage>(databaseID, collectionID);

    return response;
  };


  //delete page
  const deletePage = async (PageId: string) => {
    const response = await database.deleteDocument(databaseID, collectionID, PageId);

    return response;
  };

  return {
    getPageDetails,
    createNewPage,
    updatePage,
    getAllPages,
    deletePage,
  };
}
