import { FormElementInstance, SubmitFunction } from "../../FormElements";
import { CustomTitleInstance } from ".";
import useShortEditor from "@/hooks/editors/useShortEditor";
import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";

export default function FormComponent({ elementInstance }: { elementInstance: FormElementInstance; submitValue?: SubmitFunction; isInvalid?: boolean }) {
  const element = elementInstance as CustomTitleInstance;
  const { textField } = element.extraAttributes;
  const { editor } = useShortEditor({ savedContent: textField });

  useEffect(() => {
    if (!editor) {
      return undefined
    }

    editor.setEditable(false)
  }, [editor])


  return <EditorContent editor={editor} />;
}
