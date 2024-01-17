import useShortEditor from "@/hooks/editors/useShortEditor";
import { EditorContent } from "@tiptap/react";
import ProjectCreateContentToolbar from "./Toolbar";
// import EditorStyled from "./style";

interface Props {
  setContent: (value: string) => void;
  content: string;
}

export default function EditorComponent({ content, setContent }: Props) {
  const { editor } = useShortEditor({ });

  const limit = 250;

  const percentage = editor ? Math.round((100 / limit) * editor.storage.characterCount.characters()) : 0;
  return (
    <div>
      {editor && <ProjectCreateContentToolbar editor={editor} />}
      <EditorContent editor={editor} />
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
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>

          <div className="character-count__text" style={{ marginLeft: 5 }}>
            {editor.storage.characterCount.characters()}/{limit} characters
          </div>
        </div>
      )}
    </div>
  );
}
