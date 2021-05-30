import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { singleTaskUrl } from "../../shared/endpoints";

export const initialState = {
  task: {},
  error: null,
  status: 'idle'
};

export const getTask = createAsyncThunk("task/getTask", async (taskId) => {
  const response = await fetch(singleTaskUrl + "/" + taskId);
  const json = await response.json();
  return json
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    selectTask: (state, { payload }) => {
      state.selected = payload
    },
  },
  extraReducers: {
    [getTask.pending]: (state) => {
      state.status = "loading";
    },
    [getTask.fulfilled]: (state, { payload }) => {
      state.task = payload;
      state.status = "success";
    },
    [getTask.rejected]: (state) => {
      state.status = "failed";
      state.error = new Error("Ошибка запроса");
    }
  }
});
export const { selectTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;

export const taskSelection = state => state.taskReducer.task
export const singleTaskStatus = state => state.taskReducer.status