import { createSlice } from "@reduxjs/toolkit";

const directorySlice = createSlice({
  name: "directory",

  initialState: {
    directoriesList: [],
    currentDirectory: null,
  },

  reducers: {
    setDirectories: (state, action) => {
      state.directoriesList = action.payload;
    },

    createDirectory: (state, action) => {
      state.directoriesList.push(action.payload);
    },

    setCurrentDirectory: (state, action) => {
      state.currentDirectory = action.payload;
    },

    editDirectory: (state, action) => {
      const updatedDirectory = action.payload;

      const index = state.directoriesList.findIndex(
        (directory) =>
          directory._id === updatedDirectory._id
      );

      if (index !== -1) {
        state.directoriesList[index] = updatedDirectory;
      }
    },

    deleteDirectory: (state, action) => {
      state.directoriesList = state.directoriesList.filter(
        (directory) => directory._id !== action.payload
      );

      if (state.currentDirectory === action.payload) {
        state.currentDirectory =
          state.directoriesList[0]?._id || null;
      }
    },
  },
});

export const {
  setDirectories,
  createDirectory,
  setCurrentDirectory,
  editDirectory,
  deleteDirectory,
} = directorySlice.actions;

export default directorySlice.reducer;