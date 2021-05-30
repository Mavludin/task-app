import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  visible: false
};

const createFormSlice = createSlice({
  name: "createForm",
  initialState,
  reducers: {
    showCreateForm: (state) => {
      state.visible = true
    },
    hideCreateForm: (state) => {
      state.visible = false
    },
  }
});
export const { showCreateForm, hideCreateForm } = createFormSlice.actions;
export const createFormReducer = createFormSlice.reducer;

export const createFormVisibility = state => state.createFormReducer.visible