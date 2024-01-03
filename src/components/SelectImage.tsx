import { storage } from "@/utils/clientAppwrite";
import { formatBytes } from "@/utils/utils";
import { Models } from "appwrite";
import React, { useEffect } from "react";
import TruncatedText from "./ui/TruncatedText";
import MultipleFileUpload from "./uploadFile";
import { Check, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
  onImageAdded: (image: Models.File) => void;
  onImageRemoved: (imageID: string) => void;
  selectedFiles: string[];
}

export default function SelectImage({ onImageAdded, onImageRemoved, selectedFiles }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<Models.File[]>([]);
  // const [selectedFiles, setSelectedFiles] = React.useState<Models.File[]>([]);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      const result = await storage.listFiles("658fad6a1cfcc5125a99");

      setImages(result.files);
      setLoading(false);
    };
    getImages();
  }, []);



  const handleRemoveFile = async (index: number) => {
    const updatedFiles = [...images];
    const file = updatedFiles.splice(index, 1)[0];
    toast.promise(
      async () => {
        setImages(updatedFiles);
        await storage.deleteFile("658fad6a1cfcc5125a99", file.$id);
      },
      {
        loading: "Deleting image...",
        success: "Image deleted",
        error: "Error deleting image",
      }
    );
  };

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  return (
    <div>
      <div className="flex justify-between">
        <h2>Images</h2>
        <p>{selectedFiles.length} selected</p>
      </div>
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => {
          const x = storage.getFilePreview("658fad6a1cfcc5125a99", image.$id, 250, 250);
          const isSelected = selectedFiles.includes(image.$id);

          const handleImageClick = () => {
            if (isSelected) {
              onImageRemoved(image.$id);
            } else {
              onImageAdded(image);
            }
          };

          return (
            <div key={image.$id}>
              <TruncatedText message={image.name} />
              <div className="relative">
                <img src={x.href} alt={image.name} key={image.$id} onClick={handleImageClick} className={`${isSelected ? "border" : ""}`} />
                {isSelected && (
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

      <div>
        <Button variant="outline" disabled={selectedFiles.length === 0}>
          Save
        </Button>
      </div>

      <MultipleFileUpload />
    </div>
  );
}
