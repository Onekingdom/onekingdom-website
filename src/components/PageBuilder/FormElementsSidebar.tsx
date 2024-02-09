import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "../ui/separator";

function FormElementsSidebar() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Text Components</p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.TextField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Images</p>
        <SidebarBtnElement formElement={FormElements.ImageSlider} />
        <SidebarBtnElement formElement={FormElements.singleImage} />
      </div>
  );
}

export default FormElementsSidebar;
