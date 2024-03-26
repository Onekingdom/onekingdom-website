import { EditorElement } from "@/types/pageEditor";
import { DiscordWidgetContent } from ".";

type Props = {
  element: EditorElement<DiscordWidgetContent>;
};

export default function DiscordWidgetComponent({ element }: Props) {
  return (
    <iframe
      src={`https://discord.com/widget?id=${element.content.serverID}&theme=dark`}
      width={500}
      height={500}
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      className="iframe"
    />
  );
}
