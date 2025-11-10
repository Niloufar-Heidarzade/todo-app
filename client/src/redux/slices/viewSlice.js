import { createSlice } from "@reduxjs/toolkit";

const viewSlice  = createSlice({
  name: "view",
  initialState: "cards",
  reducers: {
    setView: (state , action) => {
      return action.payload;
    }
  }
})

export const {setView} = viewSlice.actions;
export default viewSlice.reducer;