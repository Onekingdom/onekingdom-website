import { EditorElement, EditorState, HistoryState } from "@/types/pageEditor";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 




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
  previewMode: false,
  liveMode: false,
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
    addAnElement: (state, action: PayloadAction<EditorElement>) => {
      // Access the payload using action.payload
      const newElement = action.payload;
      console.log(newElement);
    },
  }
}); 



export default pageEditorSlice.reducer;
export const { addAnElement } = pageEditorSlice.actions;