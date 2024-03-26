import { ElementSidebar, TypeTextP } from "@/types/pageEditor";
import { Grip } from "lucide-react";
import { v4 } from "uuid";
import DiscordWidgetComponent from "./DiscordWidget";

export interface DiscordWidgetContent {
  serverID: string;
 
}

const DiscordWidget: ElementSidebar<DiscordWidgetContent> = {
  icon: Grip,
  group: "discord",
  id: v4(),
  label: "Discord Widget",
  name: "Discord Widget",
  type: "discord-widget",
  defaultPayload: {
    content: {
      serverID: "",
    },
    id: v4(),
    name: "Discord Widget",
    styles: {
      styles: {
        width: "fit-content",
      },
      mediaQuerys: [],
    },
    type: "discord-widget",
  },
  component: DiscordWidgetComponent,
};

export default DiscordWidget;
