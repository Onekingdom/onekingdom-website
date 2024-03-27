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

  const device = state.editor.device;
  const isLiveMode = state.editor.displayMode === "Live";
  const EditorWidth = state.editor.width;

  // useEffect(() => {
  //   if (!styles) {
  //     console.log("no styles");
  //     return;
  //   }

  //   if (!styles.mediaQuerys) {
  //     setActiveStyle(styles.styles);
  //     return;
  //   }
  //   //find the media query based of the EditorWidth
  //   const mobileStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= EditorWidth);

  //   if (!isLiveMode) {
  //     if (device === "Desktop") {
  //       setActiveStyle(styles.styles);
  //       return;
  //     }
  //     if (!styles.mediaQuerys) {
  //       setActiveStyle(styles.styles);
  //       return;
  //     }

  //     if (device === "Tablet") {
  //       //find the tablet style
  //       const tabletStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 420);

  //       setActiveStyle({
  //         ...styles.styles,
  //         ...tabletStyle?.styles,
  //       });
  //       return;
  //     }

  //     if (device === "Mobile") {
  //       //find the mobile style
  //       const mobileStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 0);

  //       setActiveStyle({
  //         ...styles.styles,
  //         ...mobileStyle?.styles,
  //       });
  //       return;
  //     }
  //   }

  //   if (width) {
  //     if (!styles.mediaQuerys) {
  //       setActiveStyle(styles.styles);
  //       return;
  //     }

  //     if (width <= 420) {
  //       const mobileStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 0);

  //       setActiveStyle({
  //         ...styles.styles,
  //         ...mobileStyle?.styles,
  //       });
  //       return;
  //     }

  //     if (width <= 850) {
  //       const tabletStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 420);

  //       setActiveStyle({
  //         ...styles.styles,
  //         ...tabletStyle?.styles,
  //       });
  //       return;
  //     }
  //   }
  // }, [device, styles, state.editor.elements, isLiveMode, width]);

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
