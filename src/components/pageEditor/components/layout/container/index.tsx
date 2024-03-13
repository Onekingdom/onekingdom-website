import { EditorElement, ElementSidebar } from "@/types/pageEditor";
import { Container } from "lucide-react";
import { v4 } from "uuid";
import MainContainer from "../mainContainer";

const container: ElementSidebar<EditorElement[]> = {
  icon: Container,
  group: "layout",
  id: "container",
  label: "Container",
  name: "Container",
  type: "container",
  defaultPayload: {
    content: [],
    id: v4(),
    name: "Container",
    styles: {
      styles: {
        
      },
      mediaQuerys: [],
    },

    type: "container",
  },
  component: MainContainer,
};

export default container;
