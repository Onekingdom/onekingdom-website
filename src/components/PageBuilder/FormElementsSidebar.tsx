import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "../ui/separator";

function FormElementsSidebar() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Text Components</p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.ImageSlider} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Images</p>
      </div>
    </div>
  );
}

export default FormElementsSidebar;
