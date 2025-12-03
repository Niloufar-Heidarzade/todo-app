import { createSlice } from "@reduxjs/toolkit";

const directorySlice  = createSlice({
  name : "directory",
  initialState : {
    directoriesList : ["main" , "secondary"],
    currentDirectory : "main"
  },
  reducers : {
    createDirectory: (state , action) => {
      state.directoriesList.push(action.payload.toLowerCase());
    },
    setCurrentDirectory: (state , action) => {
      state.currentDirectory = action.payload.toLowerCase();
    },
    editDirectory: (state , action) => {
      const {oldName , newName} = action.payload;
      const index = state.directoriesList.indexOf(oldName.toLowerCase());
      state.directoriesList[index] = newName.toLowerCase();
    },
    deleteDirectory: (state , action) => {
      const dir = action.payload;
      const index = state.directoriesList.indexOf(dir.toLowerCase());
      state.directoriesList.splice(index , 1);
      state.currentDirectory = state.directoriesList[index] || state.directoriesList[index-1] || "main";
    }
  }
});

export const {createDirectory , setCurrentDirectory , editDirectory , deleteDirectory} = directorySlice.actions;
export default directorySlice.reducer;