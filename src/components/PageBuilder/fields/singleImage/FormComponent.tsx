import React from "react";
import { FormElementInstance } from "../../FormElements";
import { CustomTitleInstance } from ".";
import { storage } from "@/utils/clientAppwrite";
import Image from "next/image";

export default function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;

  return <>
    {element.extraAttributes && element.extraAttributes.image && (
      <Image
        src={storage.getFilePreview(element.extraAttributes.image.bucketID, element.extraAttributes.image.imageID).href}
        alt=""
        width={50}
        height={50}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    )}{" "}
  </>;
}
