import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { singleTaskUrl } from "../../shared/main/endpoints";

export const initialState = {
  task: {},
  error: null,
  getStatus: 'idle',
  putStatus: 'idle',
  postStatus: 'idle'
};

export const getTask = createAsyncThunk("task/getTask", async (taskId) => {
  const response = await fetch(singleTaskUrl + "/" + taskId);
  const json = await response.json();
  return json
});

export const editTask = createAsyncThunk("task/editTask", async (taskObj) => {
  await fetch(singleTaskUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  })
});

export const createTask = createAsyncThunk("task/createTask", async (taskObj) => {
  const response = await fetch(singleTaskUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  });
  const taskId = await response.json();
  return taskId
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
      state.getStatus = "loading";
    },
    [getTask.fulfilled]: (state, { payload }) => {
      state.task = payload;
      state.getStatus = "success";
    },
    [getTask.rejected]: (state) => {
      state.getStatus = "failed";
      state.error = new Error("Ошибка запроса");
    },
    [editTask.pending]: (state) => {
      state.putStatus = "loading";
    },
    [editTask.fulfilled]: (state) => {
      state.putStatus = "success";
    },
    [editTask.rejected]: (state) => {
      state.putStatus = "failed";
      state.error = new Error("Ошибка запроса");
    },
    [createTask.pending]: (state) => {
      state.postStatus = "loading";
    },
    [createTask.fulfilled]: (state) => {
      state.postStatus = "success";
    },
    [createTask.rejected]: (state) => {
      state.postStatus = "failed";
      state.error = new Error("Ошибка запроса");
    }
  }
});

export const { selectTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;

export const taskSelection = state => state.taskReducer.task
export const singleTaskStatus = state => state.taskReducer.getStatus
export const selectPutStatus = state => state.taskReducer.putStatus
export const selectPostStatus = state => state.taskReducer.postStatus