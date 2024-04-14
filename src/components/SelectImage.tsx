import { storage } from "@/lib/clientAppwrite";
import { formatBytes } from "@/utils/utils";
import { Models } from "appwrite";
import { Check, TrashIcon } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import TruncatedText from "./ui/TruncatedText";
import MultipleFileUpload from "./uploadFile";
import Image from "next/image";

interface Props {
  onImageAdded: (image: Models.File) => void;
  onImageRemoved: (imageID: string) => void;
  selectedFiles: string[];
  bucketID: string;
}

export default function SelectImage({ onImageAdded, onImageRemoved, selectedFiles, bucketID }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<Models.File[]>([]);

  const getImages = async () => {
    setLoading(true);
    const result = await storage.listFiles(bucketID);

    setImages(result.files);
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleRemoveFile = async (index: number) => {
    const updatedFiles = [...images];
    const file = updatedFiles.splice(index, 1)[0];
    toast.promise(
      async () => {
        setImages(updatedFiles);
        await storage.deleteFile(bucketID, file.$id);
      },
      {
        loading: "Deleting image...",
        // success: "Image deleted",
        success(data) {
          onImageRemoved(file.$id);
          return "Image deleted";
        },
        error: "Error deleting image",
      }
    );
  };

  const uploadFile = async (file: File) => {
    toast.promise(
      async () => {
        const result = await storage.createFile(bucketID, file.name, file);
        setImages([...images, result]);
      },
      {
        loading: "Uploading image...",
        success: "Image uploaded",
        error(error) {
          console.log(error);
          return error.message;
        },
     
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between ">
        <h2>Images</h2>
        <p>{selectedFiles.length} selected</p>
      </div>
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-scroll">
        {images.map((image) => {
          const x = storage.getFilePreview(bucketID, image.$id, 250, 250,);
          const isSelected = selectedFiles.includes(image.$id);

          const handleImageClick = () => {
            if (isSelected) {
              onImageRemoved(image.$id);
            } else {
              onImageAdded(image);
            }
          };

          return (
            <div key={image.$id} className="w-max">
              <TruncatedText message={image.name} />
              <div className="relative">
                <Image
                  src={x.href}
                  alt={image.name}
                  key={image.$id}
                  onClick={handleImageClick}
                  className={`${isSelected ? "border" : ""}`}
                  width={250}
                  height={250}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
                {isSelected
                 && (
                  <span className="absolute top-2 right-2">
                    <Check size={48} strokeWidth={3} />
                  </span>
                )}
              </div>

              <div className="flex justify-between mt-1">
                <p>{formatBytes(image.sizeOriginal)}</p>
                <TrashIcon className={`h-5 w-5 cursor-pointer `} onClick={() => handleRemoveFile(images.indexOf(image))} />
              </div>
            </div>
          );
        })}
      </div>


      <div className="mt-4">
        <MultipleFileUpload bucketID={bucketID} handleUpload={uploadFile} />
      </div>
    </div>
  );
}
