import { EditorElement } from "@/types/pageEditor";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { elements } from "../components";
import useStyles from "@/hooks/useStyles";
import { useEffect, useState } from "react";
import { storage } from "@/utils/clientAppwrite";
import useEditor from "@/hooks/useEditor";

type Props = {
  element: EditorElement;
};

export default function Recursive({ element }: Props) {
  const Component = elements.find((el) => el.type === element.type)?.component;
  const { activeStyle } = useStyles({ styles: element.styles });
  const { state, dispatch } = useEditor();
  const [fontFace, setFontFace] = useState<FontFace>();

  useEffect(() => {
    if (activeStyle.customFont !== undefined) {
      const url = storage.getFileView("65f05c4a768b37937d9e", activeStyle.customFont).href;

      const fontName = activeStyle.customFont.split(".")[0];

      const fontFace = new FontFace(fontName, `url(${url})`);
      fontFace.load().then((loadedFontFace) => {
        document.fonts.add(loadedFontFace);
        setFontFace(loadedFontFace);
      });
    }
  }, [activeStyle]);

  if (!Component) {
    console.log("Component not found");
    return;
  }

  const handleDeleteElement = () => {
    dispatch({
      type: "pageEditor/deleteAnElement",
      payload: state.editor.selectedElement
    });
  };


  
  const handleOnClikBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "pageEditor/setSelectedAnElement",
      payload: element,
    });
  };

  if (element.type === "container" || element.type === "2Col") {
    return <Component element={element} />;
  }

  return (
    <div
      style={{
        ...activeStyle,
        fontFamily: fontFace?.family,
      }}
      onClick={handleOnClikBody}
      className={cn("relative", {
        "!border-blue-500": state.editor.selectedElement.id === element.id && state.editor.displayMode === "Editor",
        "border-dashed border-[1px] border-slate-300 p-4": state.editor.displayMode === "Editor",
      })}
    >
      {state.editor.selectedElement.id === element.id && state.editor.displayMode === "Editor" && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">{state.editor.selectedElement.name}</Badge>
      )}
      <Component element={element} />
      {state.editor.selectedElement.id === element.id && state.editor.displayMode === "Editor" && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={() => {
              handleDeleteElement();
            }}
          />
        </div>
      )}
    </div>
  );
}
