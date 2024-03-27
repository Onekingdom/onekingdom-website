import { DeviceTypes, EditorElement, EditorState, HistoryState, PropertisElementHandler, customSettings } from "@/types/pageEditor";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
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
      console.log("SET_DISPLAY_MODE", action.payload.value)
      state.editor = {
        ...state.editor,
        displayMode: action.payload.value,
      };
    },

    //set the width
    SET_WIDTH: (state, action: PayloadAction<{ width: number }>) => {
      console.log("SET_WIDTH", action.payload.width)
      state.editor = {
        ...state.editor,
        width: action.payload.width,
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
      console.log("addAnElement", newArray)
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

      console.log("updateAnElement", action.payload)

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

      const newElementArray = updateElementStyle({ device, element, style, editorArray: state.editor.elements, width: state.editor.width});
      const newSelectedElement = findElement(newElementArray, state.editor.selectedElement.id);

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
