import { storage } from "@@/lib/clientAppwrite";
import { ID } from "appwrite";
import React from "react";

interface Props {
  bucketID: string;
}

export default function useStorage({ bucketID }: Props) {
  async function listFiles() {
    const result = await storage.listFiles(bucketID);
    return result.files;
  }

  async function deleteFile(fileID: string) {
    await storage.deleteFile(bucketID, fileID);
  }

  async function uploadFile(file: File) {
    const result = await storage.createFile(bucketID, ID.unique(), file);
    return result;
  }

  return {
    listFiles,
    deleteFile,
    uploadFile,
  };
}
