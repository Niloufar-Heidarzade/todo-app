import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modalSlice";
import taskReducer from "../slices/taskSlice";
import themeReducer from "../slices/themeSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    tasks: taskReducer,
    theme: themeReducer
  }
});

export default store;