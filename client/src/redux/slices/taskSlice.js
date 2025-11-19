import { createSlice, nanoid } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      id: 1,
      directory: "Main",
      title: "something",
      description: "hi there",
      deadline: "2025-10-19",
      isCompleted: false,
      isImportant: true,
    },
    {
      id: 2,
      directory: "Main",
      title: "Task 1",
      description: "This is the description for this task",
      deadline: "2025-04-12",
      isCompleted: false,
      isImportant: false,
    },
    {
      id: 3,
      directory: "Main",
      title: "Task 2",
      description: "This is the description for this task This is the description for this task This is the description for this task This is the description for this task This is the description for this task This is the description for this task This is the description for this task This is the description for this task This is the description for this task",
      deadline: "2025-05-15",
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
    },
    addTask: (state , action) => {
      const newTask = {id : nanoid(),...action.payload}
      state.push(newTask)
    },
    editTask: (state , action) => {
      const updatedTask = action.payload;
      const index = state.findIndex(task => task.id === updatedTask.id);
      if(index !== -1) state[index] = updatedTask;
    }
  }
});

export const {toggleCompleteById , toggleImportantById , deleteTask , addTask , editTask} = taskSlice.actions;
export default taskSlice.reducer;