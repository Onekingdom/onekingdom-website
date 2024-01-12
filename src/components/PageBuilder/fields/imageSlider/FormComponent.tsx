import React from "react";
import { FormElementInstance } from "../../FormElements";
import { CustomTitleInstance } from ".";
import { storage } from "@/utils/clientAppwrite";
import { Carousel } from "@/components/ui/Carousel";

export default function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;

  const imgsURls = element.extraAttributes.images.map((image) => {
    return storage.getFilePreview(image.bucketID, image.imageID).href;
  });

  return <>{element.extraAttributes && element.extraAttributes.images.length > 0 && <Carousel imgs={imgsURls} />}</>;
}
