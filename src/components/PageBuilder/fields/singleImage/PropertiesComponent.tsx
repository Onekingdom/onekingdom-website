import SelectImage from "@/components/SelectImage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/redux";
import { Models } from "appwrite";
import React, { useEffect } from "react";
import { FormElementInstance } from "../../FormElements";
import { updateElement } from "@/redux/pageBuilder/PageBuilderSlice";
import { CustomTitleInstance } from ".";
import { imageSchemaType } from "@/schemas/event";
import { storage } from "@/utils/clientAppwrite";
import Image from "next/image";

export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;

  const dispatch = useAppDispatch();

  function handleImageAdded(image: Models.File) {
    const previousImages = element.extraAttributes.images;

    const newImage: imageSchemaType = {
      bucketID: image.bucketId,
      imageID: image.$id,
    };

    dispatch(
      updateElement({
        id: element.id,
        element: {
          ...element,
          extraAttributes: {
            ...element.extraAttributes,
            image: newImage,
          },
        },
      })
    );
  }

  function handleImageRemoved(imageID: string) {
    dispatch(
      updateElement({
        id: element.id,
        element: {
          ...element,
          extraAttributes: {
            ...element.extraAttributes,
          },
        },
      })
    );
  }

  return (
    <div>
      <p>Add Images</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Image</p>

        <div className="col-span-1 md:col-span-2 my-2 place-self-start">
          <Dialog>
            <DialogTrigger>Add Image</DialogTrigger>
            <DialogContent className="w-1/2">
              <SelectImage
                onImageAdded={handleImageAdded}
                onImageRemoved={handleImageRemoved}
                selectedFiles={element.extraAttributes.image ? [element.extraAttributes.image.imageID] : []}
                bucketID="658fad6a1cfcc5125a99"
              />
            </DialogContent>
          </Dialog>
        </div>

        {element.extraAttributes.image && (
          <div className="col-span-1 md:col-span-2 my-2 place-self-start">
            <Image
              src={storage.getFilePreview(element.extraAttributes.image.bucketID, element.extraAttributes.image.imageID, 250, 250).href}
              alt=""
              width={250}
              height={250}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
        )}
      </div>
    </div>
  );
}
