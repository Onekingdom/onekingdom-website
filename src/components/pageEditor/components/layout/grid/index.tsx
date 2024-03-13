import { EditorElement, ElementSidebar } from "@/types/pageEditor";
import { Container } from "lucide-react";
import { v4 } from "uuid";
import MainContainer from "../mainContainer";

const Grid: ElementSidebar<EditorElement[]> = {
  icon: Container,
  group: "layout",
  id: "grid",
  label: "grid",
  name: "grid",
  type: "grid",
  defaultPayload: {
    content: [],
    id: v4(),
    name: "Grid",
    styles: {
      styles: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
      },
      mediaQuerys: [
        {
          minWidth: 421,
          styles: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
        
        },
        {
          minWidth: 0,
          styles: {
            gridTemplateColumns: "repeat(1, 1fr)",
          },
        },
      ],
    },

    type: "container",
  },
  component: MainContainer,
};

export default Grid;
