import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "../ui/separator";

function FormElementsSidebar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
      <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Text</p>
      <SidebarBtnElement formElement={FormElements.TitleField} />
      <SidebarBtnElement formElement={FormElements.TextField} />

      <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Image</p>
      <SidebarBtnElement formElement={FormElements.ImageSlider} />
      <SidebarBtnElement formElement={FormElements.singleImage} />
      {/* <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Video</p>
      <SidebarBtnElement formElement={FormElements.VideoPopup} /> */}
    </div>
  );
}

export default FormElementsSidebar;
