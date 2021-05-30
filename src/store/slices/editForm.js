import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  visible: false
};

const editFormSlice = createSlice({
  name: "editForm",
  initialState,
  reducers: {
    showEditForm: (state) => {
      state.visible = true
    },
    hideEditForm: (state) => {
      state.visible = false
    },
  }
});
export const { showEditForm, hideEditForm } = editFormSlice.actions;
export const editFormReducer = editFormSlice.reducer;

export const editFormVisibility = state => state.editFormReducer.visible