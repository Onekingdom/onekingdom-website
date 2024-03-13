import { EditorElement, ElementSidebar } from "@/types/pageEditor";
import { CircleUser, Container } from "lucide-react";
import { v4 } from "uuid";
import MemberCardComponent from "./MemberCard";

export interface TeamCardProps {
  name?: string;
  description?: string;
  img?: { bucketID: string; imageID: string };
  // socials: socialMediaType[];
}


const container: ElementSidebar<TeamCardProps> = {
  icon: CircleUser,
  group: "onekingdom",
  id: "memberCard",
  label: "memberCard",
  name: "memberCard",
  type: "memberCard",
  defaultPayload: {
    content: {
      description: "description",
      name: "name",
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
};

export default container;
