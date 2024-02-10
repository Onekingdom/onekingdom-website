import React from "react";
import { FormElementInstance } from "../../FormElements";
import { CustomTitleInstance } from ".";
import { storage } from "@/utils/clientAppwrite";
import Image from "next/image";

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;
  return (
    <div>
      <p>Image Slider</p>
      <div className="flex">
        {element.extraAttributes &&
          element.extraAttributes.images.map((image, index) => <Image key={index} src={storage.getFilePreview(image.bucketID, image.imageID).href} alt="" width={250} height={250} />)}
      </div>
    </div>
  );
}
