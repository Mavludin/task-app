import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createFormReducer } from "./slices/createForm";
import { editFormReducer } from "./slices/editForm";
import { taskReducer } from "./slices/task";
import { tasksReducer } from "./slices/tasks";

const reducer = combineReducers({
  editFormReducer,
  createFormReducer,
  taskReducer,
  tasksReducer
})

export const globalStore = configureStore({
  reducer
});