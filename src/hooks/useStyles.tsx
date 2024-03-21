import { PropertisElementHandler, Styles, customSettings } from "@/types/pageEditor";
import React, { use, useEffect } from "react";
import useEditor from "./useEditor";

interface Props {
  styles: Styles;
}

export default function useStyles({ styles }: Props) {
  const [activeStyle, setActiveStyle] = React.useState<customSettings>({});
  const { state } = useEditor();

  const device = state.editor.device;
  const isLiveMode = state.editor.liveMode;

  useEffect(() => {
    if(!styles) return;

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
      const tabletStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 420);

      setActiveStyle({
        ...styles.styles,
        ...tabletStyle?.styles,
      });
    }

    if (device === "Mobile") {
      //find the mobile style
      const mobileStyle = styles.mediaQuerys.find((mediaQuery) => mediaQuery.minWidth >= 0);

      setActiveStyle({
        ...styles.styles,
        ...mobileStyle?.styles,
      });
    }
  }, [device, styles, state.editor.elements]);

  //update the styles based on the device

  return { activeStyle };
}
