import React, { use, useCallback, useEffect, useState } from "react";
import { storage } from "@/lib/clientAppwrite";
import { ID, Models } from "appwrite";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface props {
  toggleModal?: () => void;
}

export default function FontUpload({ toggleModal }: props) {
  const [fonts, setFonts] = useState<Models.FileList>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      try {
        await storage.createFile("65f05c4a768b37937d9e", file.name, file);
        toast.success(`Font ${file.name} uploaded successfully`);
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  
    if (toggleModal) {
      toggleModal();
    }
  }, [toggleModal]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        <div className="max-w-md w-full  p-8 rounded-md shadow-md">
          <div className="text-center">
            <p className="text-3xl font-bold mb-4">Upload Font</p>
            <p className="text-gray-600">There are no fonts found in storage.</p>
            <p className="text-gray-600">Please upload some fonts to use them in your project.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
