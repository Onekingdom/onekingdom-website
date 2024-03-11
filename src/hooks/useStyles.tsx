import { useEditor } from "@/providers/editor/editor-provider";
import { PropertisElementHandler, Styles } from "@/types/pageEditor";
import React, { use, useEffect } from "react";

interface Props {
  styles: Styles;
}

export default function useStyles({ styles }: Props) {
  const [activeStyle, setActiveStyle] = React.useState<React.CSSProperties>(styles.styles);
  const { state, dispatch } = useEditor();

  const device = state.editor.device;
  const isLiveMode = state.editor.liveMode;

  useEffect(() => {
    if (device === "Desktop") {
      setActiveStyle(styles.styles);
      return;
    }
    if (!styles.mediaQuerys) {
      setActiveStyle(styles.styles);
      return;
    }

    if (device === "Tablet") {
      //find the tablet style
      const tabletStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 375);

      setActiveStyle({
        ...styles.styles,
        ...tabletStyle?.styles,
      });

      return;
    }

    if (device === "Mobile") {
      //find the mobile style
      const mobileStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 0);
      setActiveStyle({
        ...styles.styles,
        ...mobileStyle?.styles,
      });

      return;
    }
  }, [device, styles, isLiveMode]);

  //update the styles based on the device

  function handleOnChanges(e: PropertisElementHandler) {
    const styleSettings = e.target.id as keyof typeof activeStyle;
    const { id, value } = e.target;
    const styleObject = {
      [styleSettings]: value,
    };

    if (state.editor.selectedElement.styles.styles[styleSettings] !== value) {
      const newStyles: Styles = {
        ...state.editor.selectedElement.styles,
      }


      switch (device) {
        case "Desktop":
          newStyles.styles = {
            ...newStyles.styles,
            ...styleObject,
          };
          break;
        case "Tablet":
          newStyles.mediaQuerys = newStyles.mediaQuerys || [];
          const tabletIndex = newStyles.mediaQuerys.findIndex((mediaQuery) => mediaQuery.minWidth >= 375);
          if (tabletIndex === -1) {
            newStyles.mediaQuerys.push({
              minWidth: 375,
              styles: {
                ...styleObject,
              },
            });
          } else {
            newStyles.mediaQuerys[tabletIndex].styles = {
              ...newStyles.mediaQuerys[tabletIndex].styles,
              ...styleObject,
            };
          }
          break;
        case "Mobile":
          newStyles.mediaQuerys = newStyles.mediaQuerys || [];
          const mobileIndex = newStyles.mediaQuerys.findIndex((mediaQuery) => mediaQuery.minWidth >= 0);
          if (mobileIndex === -1) {
            newStyles.mediaQuerys.push({
              minWidth: 0,
              styles: {
                ...styleObject,
              },
            });
          } else {
            newStyles.mediaQuerys[mobileIndex].styles = {
              ...newStyles.mediaQuerys[mobileIndex].styles,
              ...styleObject,
            };
          }
          break;
      }


      


      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: {
            ...state.editor.selectedElement,
            styles: newStyles,
          },
        },
      });

    }
  }

  return { activeStyle, handleOnChanges };
}

// dispatch({
//   type: "UPDATE_ELEMENT",
//   payload: {
//     elementDetails: {
//       ...state.editor.selectedElement,
//       styles: {
//         ...state.editor.selectedElement.styles,

//         styles: {
//           ...state.editor.selectedElement.styles.styles,

//           ...styleObject,
//         },
//       },
//     },
//   },
// });
