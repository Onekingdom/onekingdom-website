import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TypographyExtension from "@tiptap/extension-typography";
import UnderlineExtension from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { ColorHighlighter } from "@/components/richeditor/content/ColourHighlighter";
import { SmilieReplacer } from "@/components/richeditor/content/SmilieReplacer";

interface Props {
  savedContent?: string
  limit?: number
}

export default function useShortEditor({ savedContent, limit }: Props) {
  const [content, setContent] = React.useState<string>(savedContent || "");

  // console.log(content)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Subscript,
      Superscript,
      Highlight,
      TypographyExtension,
      UnderlineExtension,
      // Document,
      // Paragraph,
      // Text,
      Link,
      CharacterCount.configure({
        limit: limit,
        mode: "textSize",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      ColorHighlighter,
      SmilieReplacer,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return { editor, content, setContent };
}
