import React from "react";
import { FormElementInstance } from "../../FormElements";
import { CustomTitleInstance } from ".";
import { storage } from "@/utils/clientAppwrite";

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;
  return (
    <div>
      <p>Image Slider</p>
      <div className="flex">
        {element.extraAttributes &&
          element.extraAttributes.images.map((image, index) => <img key={index} src={storage.getFilePreview(image.bucketID, image.imageID, 50, 50).href} />)}
      </div>
    </div>
  );
}
