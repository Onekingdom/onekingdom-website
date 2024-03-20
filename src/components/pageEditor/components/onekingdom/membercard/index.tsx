import { EditorElement, ElementSidebar } from "@/types/pageEditor";
import { CircleUser, Container } from "lucide-react";
import { v4 } from "uuid";
import MemberCardComponent from "./MemberCard";
import Settings from "./MemberSettings";

export interface MemberCardProps {
  userID?: string;
}


const container: ElementSidebar<MemberCardProps> = {
  icon: CircleUser,
  group: "onekingdom",
  id: "memberCard",
  label: "memberCard",
  name: "memberCard",
  type: "memberCard",
  defaultPayload: {
    content: {

    },
    id: v4(),
    name: "memberCard",
    styles: {
      styles: {
        
      },
      mediaQuerys: [],
    },

    type: "memberCard",
  },
  component: MemberCardComponent,
  settings: Settings,
};

export default container;
