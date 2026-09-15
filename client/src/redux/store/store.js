import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "../slices/modalSlice";

import taskReducer from "../slices/taskSlice";

import themeReducer from "../slices/themeSlice";

import viewReducer from "../slices/viewSlice";

import directoryReducer from "../slices/directorySlice";

import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,

    tasks: taskReducer,

    theme: themeReducer,

    view: viewReducer,

    directory: directoryReducer,

    user: userReducer,
  },
});

export default store;