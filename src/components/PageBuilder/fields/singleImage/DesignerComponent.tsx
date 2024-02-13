import React from "react";
import { FormElementInstance } from "../../FormElements";
import { CustomTitleInstance } from ".";
import { storage } from "@/utils/clientAppwrite";
import Image from "next/image";

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;
  return (
    <div>
      <p>Single Image</p>
      <div className="flex">
        {element.extraAttributes && element.extraAttributes.image && (
          <Image
            src={storage.getFilePreview(element.extraAttributes.image.bucketID, element.extraAttributes.image.imageID, 50, 50).href}
            alt=""
            width={50}
            height={50}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        )}
      </div>
    </div>
  );
}
