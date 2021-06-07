import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tasksUrl } from "../../shared/main/endpoints";

const initialState = {
  tasks: [],
  status: "idle",
  error: null
};

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  const response = await fetch(tasksUrl);
  const json = await response.json();
  return json.value
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: {
    [getTasks.pending]: (state) => {
      state.status = "loading";
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.tasks = payload;
    },
    [getTasks.rejected]: (state) => {
      state.status = "failed";
      state.error = new Error("Ошибка запроса");
    }
  }
});

export const tasksReducer = tasksSlice.reducer;

export const taskList = state => state.tasksReducer.tasks
export const taskListStatus = state => state.tasksReducer.status