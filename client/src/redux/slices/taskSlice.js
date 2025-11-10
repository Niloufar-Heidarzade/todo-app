import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      id: 1,
      directory: "Main",
      title: "something",
      description: "hi there",
      deadline: "10/19/2025",
      isCompleted: false,
      isImportant: true,
    },
    {
      id: 2,
      directory: "Main",
      title: "Task 1",
      description: "This is the description for this task",
      deadline: "04/12/2025",
      isCompleted: false,
      isImportant: false,
    },
    {
      id: 3,
      directory: "Main",
      title: "Task 2",
      description: "This is the description for this task",
      deadline: "05/15/2025",
      isCompleted: true,
      isImportant: true,
    },
  ],
  reducers:{
    toggleCompleteById: (state , action) => {
      const task = state.find(task => task.id === action.payload);
      if(task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    toggleImportantById: (state , action) => {
      const task = state.find(task => task.id === action.payload);
      if(task) {
        task.isImportant = !task.isImportant;
      }
    },
    deleteTask: (state , action) => {
      return state.filter(task => task.id !== action.payload)
    }
  }
});

export const {toggleCompleteById , toggleImportantById , deleteTask} = taskSlice.actions;
export default taskSlice.reducer;