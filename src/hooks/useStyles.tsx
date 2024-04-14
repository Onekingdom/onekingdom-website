import { PropertisElementHandler, Styles, customSettings } from "@/types/pageEditor";
import React, { use, useEffect } from "react";
import useEditor from "./useEditor";
import { useWindowSize } from "@uidotdev/usehooks";


interface Props {
  styles: Styles;
}

export default function useStyles({ styles }: Props) {
  const [activeStyle, setActiveStyle] = React.useState<customSettings>(styles.styles);
  const size = useWindowSize();
  const { state } = useEditor();

  const EditorWidth = state.editor.width;

  useEffect(() => {
    if (!styles) return;

    if (!styles.mediaQuerys) {
      setActiveStyle(styles.styles);
      return;
    }

    if (state.editor.displayMode === "Live" && size.width) {
      console.log("width", size.width);
      const MediaQ = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= size.width!);

      console.log("MediaQ", MediaQ);

      setActiveStyle({
        ...styles.styles,
        ...MediaQ?.styles,
      });
      return;
    }

    const MediaQ = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= EditorWidth);

    setActiveStyle({
      ...styles.styles,
      ...MediaQ?.styles,
    });
    return;
  }, [EditorWidth, styles, state.editor.elements, size.width]);

  //update the styles based on the device

  return { activeStyle };
}
