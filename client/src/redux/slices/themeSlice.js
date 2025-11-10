import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState : {
    darkmode : false
  },
  reducers : {
    toggleTheme : (state) => {
      state.darkmode = !state.darkmode
    }
  }
})

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;