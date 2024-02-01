import useStorage from "@/hooks/useStorage";
import React, { useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

interface Props {
  bucketID: string;
  handleUpload: (file: File) => void;
}

const FileUpload = ({ bucketID, handleUpload }: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]); // Provide the correct type for uploadedFiles state

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: FileWithPath[]) => {
      // Provide the correct type for acceptedFiles
      setUploadedFiles(acceptedFiles);
      handleUpload(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps()} className=" w-full h-96 border border-dashed rounded-sm flex flex-col justify-center items-center">
      <input {...getInputProps()} />
      <span className="text-8xl">
        <FaCloudUploadAlt />
      </span>
      <p>Drag and drop files here or click to browse.</p>
    </div>
  );
};

export default FileUpload;
