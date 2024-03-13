import { ElementSidebar, TypeTextP } from "@/types/pageEditor";
import { AArrowDown } from "lucide-react";
import { v4 } from "uuid";
import ButtonElement from "./button";
import settings from "./settings";

export interface ButtonContent {
  innerText: string;
  icon?: string;
  href: string;
  openNewTab: boolean;
}

const button: ElementSidebar<ButtonContent> = {
  icon: AArrowDown,
  group: "elements",
  id: v4(),
  label: "Button",
  name: "Button",
  type: "button",
  defaultPayload: {
    content: {
      innerText: "Text",
      openNewTab: false,
      href: "/",
      // icon: "",
    },
    id: v4(),
    name: "Button",
    styles: {
      styles: {
        color: "white",
        fontSize: "16px",
        fontWeight: "normal",
        textAlign: "center",
      },
      mediaQuerys: [],
    },
    type: "button",
  },
  component: ButtonElement,
  settings: settings,
};

export default button;
