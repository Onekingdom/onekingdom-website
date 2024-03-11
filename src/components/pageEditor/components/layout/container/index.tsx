import { defaultStyles } from "@/lib/constants";
import { EditorElement, ElementSidebar } from "@/types/pageEditor";
import { Container } from "lucide-react";
import { blue, white } from "tailwindcss/colors";
import { v4 } from "uuid";
import ContainerComponent from "../container";
import MainContainer from "../mainContainer";

interface ContainerProps {}

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
        backgroundColor: "blue",
      },
      mediaQuerys: [
        {minWidth: 0, styles: {backgroundColor: "black"}},
      ],
      activeStyle: {},
    },


    type: "container",
  },
  component: MainContainer,
};

export default container;
