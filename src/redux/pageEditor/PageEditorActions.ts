import { DeviceTypes, EditorElement, customSettings, Styles } from "@/types/pageEditor";




//logic to add an element to the editor
export const addElement = (editorArray: EditorElement[], action: { containerId: string; elementDetails: EditorElement }): EditorElement[] => {
  return editorArray.map((item) => {
    if (item.id === action.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addElement(item.content, action),
      };
    }
    return item;
  });
};

//logic to delete an element from the editor
export const deleteElement = (editorArray: EditorElement[], action: EditorElement): EditorElement[] => {
  return editorArray.filter((item) => {
    if (item.id === action.id) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteElement(item.content, action);
    }
    return true;
  });
};

export const updateElement = (editorArray: EditorElement[], element: EditorElement): EditorElement[] => {
  return editorArray.map((item) => {
    if (item.id === element.id) {
      if (item.id === "__body") {
        const newobj = {
          ...item,
          styles: {
            ...item.styles,
            ...element.styles,
          },
        };

        return newobj;
      }

      return { ...item, ...element };
    } else if (item.content && Array.isArray(item.content) && item.content.length > 0) {
      return {
        ...item,
        content: updateElement(item.content, element),
      };
    }
    return item;
  });
};

export const updateElementStyle = (payload: {
  editorArray: EditorElement[];
  device: DeviceTypes;
  element: EditorElement;
  style: customSettings;
}): EditorElement[] => {
  const { device, element, style } = payload;
  return payload.editorArray.map((item) => {
    if (item.id === element.id) {
      let newElementStyles: Styles = {} as Styles;

      if (device === "Desktop") {
        newElementStyles = {
          ...item.styles,
          styles: {
            ...item.styles.styles,
            ...style,
          },
         
        };
      }

      if (device === "Tablet") {
        const tabletStyleIndex = item.styles.mediaQuerys!.findIndex((mediaQuery) => mediaQuery.minWidth === 420);

        if (tabletStyleIndex !== -1) {

          const tabletStyle = item.styles.mediaQuerys![tabletStyleIndex];

          newElementStyles = {
            ...item.styles,
            mediaQuerys: [
              ...item.styles.mediaQuerys!.slice(0, tabletStyleIndex),
              {
                ...tabletStyle,
                styles: {
                  ...tabletStyle.styles,
                  ...style,
                },
              },
              ...item.styles.mediaQuerys!.slice(tabletStyleIndex + 1),
            ],
          };
        } else {
          newElementStyles = {
            ...item.styles,
            mediaQuerys: [
              ...item.styles.mediaQuerys!,
              {
                minWidth: 420,
                styles: {
                  ...style,
                },
              },
            ],
          };
        }
      }

      if (device === "Mobile") {
        const MobileStyleIndex = item.styles.mediaQuerys!.findIndex((mediaQuery) => mediaQuery.minWidth === 0);

        if (MobileStyleIndex !== -1) {
          const MobileStyle = item.styles.mediaQuerys![MobileStyleIndex];

          newElementStyles = {
        ...item.styles,
        mediaQuerys: [
          {
            ...MobileStyle,
            styles: {
          ...MobileStyle.styles,
          ...style,
            },
          },
          ...item.styles.mediaQuerys!.slice(0, MobileStyleIndex),
          ...item.styles.mediaQuerys!.slice(MobileStyleIndex + 1),
        ],
          };
        } else {
          newElementStyles = {
        ...item.styles,
        mediaQuerys: [
          {
            minWidth: 0,
            styles: {
          ...style,
            },
          },
          ...item.styles.mediaQuerys!,
        ],
          };
        }
      }

      const newElement = {
        ...element,
        styles: newElementStyles,
      };

      return { ...item, ...newElement };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateElementStyle({
          device,
          editorArray: item.content,
          element,
          style,
        }),
      };
    }
    return item;
  });
};

export const findElement = (editorArray: EditorElement[], id: string): EditorElement | null => {
  const found = editorArray.find((item) => item.id === id);
  if (found) {
    return found;
  }
  for (const item of editorArray) {
    if (item.content && Array.isArray(item.content)) {
      const found = findElement(item.content, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};
