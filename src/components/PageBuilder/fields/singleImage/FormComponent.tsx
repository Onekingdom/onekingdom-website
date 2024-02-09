import React from "react";
import { FormElementInstance } from "../../FormElements";
import { CustomTitleInstance } from ".";
import { storage } from "@/utils/clientAppwrite";
import { Carousel } from "@/components/ui/Carousel";

export default function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;

  return (
    <>
      {element.extraAttributes && element.extraAttributes.image && (
        <img src={storage.getFilePreview(element.extraAttributes.image.bucketID, element.extraAttributes.image.imageID).href} />
      )}{" "}
    </>
  );
}
