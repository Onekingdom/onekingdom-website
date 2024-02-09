// Rename the file to pageBuilderSlice.ts

import { FormElementInstance } from "@/components/PageBuilder/FormElements";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageBuilderState {
  elements: FormElementInstance[];
  selectedElement: FormElementInstance | null;
}

const initialState: PageBuilderState = {
  elements: [],
  selectedElement: null,
};

const pageBuilderSlice = createSlice({
  name: "pageBuilder", // Updated the slice name
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<FormElementInstance[]>) => {
      state.elements = action.payload;
    },
    addElement: (state, action: PayloadAction<{ index: number; element: FormElementInstance }>) => {
      const { index, element } = action.payload;
      state.elements.splice(index, 0, element);
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.elements = state.elements.filter((element) => element.id !== action.payload);
      state.selectedElement = null;

    },
    setSelectedElement: (state, action: PayloadAction<FormElementInstance | null>) => {
      state.selectedElement = action.payload;
    },
    updateElement: (
      state,
      action: PayloadAction<{ id: string; element: FormElementInstance }>
    ) => {
      const { id, element } = action.payload;
      const index = state.elements.findIndex((el) => el.id === id);
      if (index !== -1) {
        state.elements[index] = element;
      }
    },
  },
});

export const {
  setElements,
  addElement,
  removeElement,
  setSelectedElement,
  updateElement,
} = pageBuilderSlice.actions;

export default pageBuilderSlice.reducer;
