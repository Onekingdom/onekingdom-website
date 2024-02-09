import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormElementInstance } from "../../FormElements";
import { CustomTitleInstance } from ".";
import { useEditor } from "@tiptap/react";
import useShortEditor from "@/hooks/editors/useShortEditor";
import { EditorContent } from "@tiptap/react";

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomTitleInstance;
  const { textField } = element.extraAttributes;


  const {} = useShortEditor({ savedContent: textField });
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Paragraph</Label>
      <p className="block overflow-hidden text-ellipsis whitespace-nowrap">{textField}</p>
    </div>
  );
}
