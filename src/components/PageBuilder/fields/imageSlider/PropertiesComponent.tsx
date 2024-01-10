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

export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;



  const dispatch = useAppDispatch();

  function handleImageAdded(image: Models.File) {
    const previousImages = element.extraAttributes.images;


    const newImageArray: imageSchemaType[] = [
      ...previousImages,
      {
        bucketID: image.bucketId,
        imageID: image.$id,
      },
    ];

    dispatch(
      updateElement({
        id: element.id,
        element: {
          ...element,
          extraAttributes: {
            ...element.extraAttributes,
            images: newImageArray,
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
            images: element.extraAttributes.images.filter((i) => i.imageID !== imageID),
          },
        },
      })
    );
  }

  return (
    <div>
      <p>Add Images</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Images</p>

        <div className="col-span-1 md:col-span-2 my-2 place-self-start">
          <Dialog>
            <DialogTrigger>Add Images</DialogTrigger>
            <DialogContent>
              <SelectImage
                onImageAdded={handleImageAdded}
                onImageRemoved={handleImageRemoved}
                selectedFiles={element.extraAttributes.images.map((i) => i.imageID)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
