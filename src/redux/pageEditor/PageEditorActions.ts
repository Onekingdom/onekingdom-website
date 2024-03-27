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
  width: number;
}): EditorElement[] => {
  const { device, element, style, width } = payload;
  return payload.editorArray.map((item) => {
    if (item.id === element.id) {
      let newElementStyles: Styles = {} as Styles;

      if (width === 1920) {
        newElementStyles = {
          ...item.styles,
          styles: {
            ...item.styles.styles,
            ...style,
          },
         
        };
      }

      if (width !== 1920) {
        const mediaQuery = item.styles.mediaQuerys!.findIndex((mediaQuery) => mediaQuery.minWidth === width);

        if (mediaQuery !== -1) {

          const tabletStyle = item.styles.mediaQuerys![mediaQuery];

          newElementStyles = {
            ...item.styles,
            mediaQuerys: [
              ...item.styles.mediaQuerys!.slice(0, mediaQuery),
              {
                ...tabletStyle,
                styles: {
                  ...tabletStyle.styles,
                  ...style,
                },
              },
              ...item.styles.mediaQuerys!.slice(mediaQuery + 1),
            ],
          };
        } else {
          newElementStyles = {
            ...item.styles,
            mediaQuerys: [
              ...item.styles.mediaQuerys!,
              {
                minWidth: width,
                styles: {
                  ...style,
                },
              },
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
          width: payload.width,
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
