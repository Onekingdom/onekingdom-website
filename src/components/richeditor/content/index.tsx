import useShortEditor from "@/hooks/editors/useShortEditor";
import { EditorContent } from "@tiptap/react";
import ProjectCreateContentToolbar from "./Toolbar";
import { useEffect } from "react";
import EditorStyled from "./style";

interface Props {
  setContent: (value: string) => void;
  content: string;
  limit?: number;
}

export default function EditorComponent({ content, setContent, limit }: Props) {
  const { editor } = useShortEditor({ savedContent: content, limit });

  useEffect(() => {
    // console.log(editor?.getHTML());
    setContent(editor?.getHTML() || "");
  }, [editor?.getHTML()]);

  // editor?.commands.setContent(content);

  return (
    <div>
      {editor && <ProjectCreateContentToolbar editor={editor} />}
      <EditorStyled>
        <EditorContent editor={editor} />
      </EditorStyled>
      {editor && (
        <div
          className={`character-count ${editor.storage.characterCount.characters() === limit ? "character-count--warning" : ""}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <svg height="20" width="20" viewBox="0 0 20 20" className="character-count__graph">
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle r="5" cx="10" cy="10" fill="transparent" stroke="currentColor" strokeWidth="10" transform="rotate(-90) translate(-20)" />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>

          <div className="character-count__text" style={{ marginLeft: 5 }}>
            {editor.storage.characterCount.characters()}/{limit ? limit : "unlimited"} characters
          </div>
        </div>
      )}
    </div>
  );
}
