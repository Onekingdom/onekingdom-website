import { Editor } from "@tiptap/react";

// import ToggleButton from "@mui/material/ToggleButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function HeadingToolbarButtons({ editor }: { editor: Editor }) {
  return (
    <ToggleGroup type="multiple" aria-label="text alignment">
      <ToggleGroupItem
        value="h1"
        aria-label="H1 Text"
        // onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        // selected={editor.isActive("heading", { level: 1 })}
      >
        <p style={{ fontWeight: 700 }}>H1</p>
      </ToggleGroupItem>
      <ToggleGroupItem
        // onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        // selected={editor.isActive("heading", { level: 2 })}
        value="h2"
        aria-label="H2 Text"
      >
        <p style={{ fontWeight: 800 }}>H2</p>
      </ToggleGroupItem>
      <ToggleGroupItem
        // onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        // selected={editor.isActive("heading", { level: 3 })}
        value="h3"
        aria-label="H3 Text"
      >
        <p style={{ fontWeight: 800 }}>H3</p>
      </ToggleGroupItem>
      <ToggleGroupItem
        // onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        // selected={editor.isActive("heading", { level: 4 })}
        value="h4"
        aria-label="H4 Text"
      >
        <p style={{ fontWeight: 700 }}>H4</p>
      </ToggleGroupItem>
      <ToggleGroupItem
        // onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        // selected={editor.isActive("heading", { level: 5 })}
        value="h5"
        aria-label="H5 Text"
      >
        <p style={{ fontWeight: 600 }}>H5</p>
      </ToggleGroupItem>
      <ToggleGroupItem
        // onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        // selected={editor.isActive("heading", { level: 6 })}
        value="h6"
        aria-label="H6 Text"
      >
        <p style={{ fontWeight: 800 }}>H6</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
