import { PropertisElementHandler, Styles, customSettings } from "@/types/pageEditor";
import React, { use, useEffect } from "react";
import useEditor from "./useEditor";
import useWindowDimensions from "./useWindowDimensions";

interface Props {
  styles: Styles;
}

export default function useStyles({ styles }: Props) {
  const [activeStyle, setActiveStyle] = React.useState<customSettings>(styles.styles);
  const { height, width } = useWindowDimensions();
  const { state } = useEditor();

  const EditorWidth = state.editor.width;
  useEffect(() => {
    if (!styles) return;

    if (!styles.mediaQuerys) {
      setActiveStyle(styles.styles);
      return;
    }

    const MediaQ = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= EditorWidth);
     
      setActiveStyle({
        ...styles.styles,
        ...MediaQ?.styles,
      });


 
  }, [EditorWidth, styles, state.editor.elements, ]);

  //update the styles based on the device

  return { activeStyle };
}
