import { DeviceTypes, EditorElement, EditorState, HistoryState, customSettings } from "@/types/pageEditor";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addElement, deleteElement, findElement, updateElement, updateElementStyle } from "./PageEditorActions";

const initialEditorState: EditorState["editor"] = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {
        styles: {
          minHeight: "100vh",
          height: "fit-content",
          minWidth: "100%",
        },
        mediaQuerys: [],
      },
      type: "container",
    },
  ],
  selectedElement: {
    id: "",
    content: [],
    name: "",
    styles: {
      styles: {},
      mediaQuerys: [],
    },
    type: null,
  },
  device: "Desktop",
  displayMode: "Live",
  width: 1920,
  mediaQuerys: [1920, 1024, 768, 425],
  activeMediaQuery: 1920,
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const pageEditorSlice = createSlice({
  name: "pageEditor",
  initialState: {
    editor: initialEditorState,
    history: initialHistoryState,
  },
  reducers: {
    //load data
    loadData: (
      state,
      action: PayloadAction<{
        elements: EditorElement[] | null;
        withLive: boolean;
        displayMode: "Live" | "Editor" | "Preview";
      }>
    ) => {
      state.editor = {
        ...state.editor,
        elements: action.payload.elements ?? state.editor.elements,
        displayMode: action.payload.displayMode ?? state.editor.displayMode,
      };
    },

    // clear data
    clearData: (state) => {
      state.editor = initialEditorState;
    },

    //set the display mode
    SET_DISPLAY_MODE: (state, action: PayloadAction<{ value: "Live" | "Editor" | "Preview" }>) => {
      state.editor = {
        ...state.editor,
        displayMode: action.payload.value,
      };
    },

    //set the width
    SET_WIDTH: (state, action: PayloadAction<{ width: number }>) => {
      // find the closest media query
      const mediaQuery = state.editor.mediaQuerys.reduce((prev, curr) =>
        Math.abs(curr - action.payload.width) < Math.abs(prev - action.payload.width) ? curr : prev
      );

      state.editor = {
        ...state.editor,
        width: action.payload.width,
        activeMediaQuery: mediaQuery,
      };
    },

    // add media query
    ADD_MEDIA_QUERY: (state, action: PayloadAction<{ value: number }>) => {
      state.editor = {
        ...state.editor,
        mediaQuerys: [...state.editor.mediaQuerys, action.payload.value].sort((a, b) => a - b),
      };
    },

    //add an element
    addAnElement: (
      state,
      action: PayloadAction<{
        containerId: string;
        elementDetails: EditorElement;
      }>
    ) => {
      const newArray = addElement(state.editor.elements, action.payload);
      state.editor = {
        ...state.editor,
        elements: newArray,
        selectedElement: action.payload.elementDetails,
      };
    },

    //set the selected element
    setSelectedAnElement: (state, action: PayloadAction<EditorElement | null>) => {
      state.editor = {
        ...state.editor,
        selectedElement: action.payload ?? initialEditorState.selectedElement,
      };
    },

    //delete the element
    deleteAnElement: (state, action: PayloadAction<EditorElement>) => {
      const newArray = deleteElement(state.editor.elements, action.payload);

      state.editor = {
        ...state.editor,
        elements: newArray,
      };
    },

    //update an element
    updateAnElement: (state, action: PayloadAction<EditorElement>) => {
      const newArray = updateElement(state.editor.elements, action.payload);

      state.editor = {
        ...state.editor,
        elements: newArray,
        selectedElement: action.payload,
      };
    },
    //update an element
    updateAnElementStyle: (
      state,
      action: PayloadAction<{
        element: EditorElement;
        style: customSettings;
      }>
    ) => {
      const device = state.editor.device;

      const { element, style } = action.payload;

      const newElementArray = updateElementStyle({ device, element, style, editorArray: state.editor.elements, width: state.editor.width });
      const newSelectedElement = findElement(newElementArray, state.editor.selectedElement.id);

      console.log("newElementArray", newElementArray);

      state.editor = {
        ...state.editor,
        elements: newElementArray,
        selectedElement: newSelectedElement ?? state.editor.selectedElement,
      };
    },
    //set the device
    setDeviceType: (state, action: PayloadAction<DeviceTypes>) => {
      state.editor = {
        ...state.editor,
        device: action.payload,
      };
    },
  },
});

export default pageEditorSlice.reducer;
export const { addAnElement, loadData } = pageEditorSlice.actions;
