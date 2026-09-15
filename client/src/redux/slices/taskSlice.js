import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",

  initialState: {
    tasksList: [],
    searchQuery: "",
    sortOption: "orderAdded",
  },

  reducers: {
    setTasks: (state, action) => {
      state.tasksList = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },

    toggleCompleteById: (state, action) => {
      const task = state.tasksList.find(
        (task) => task._id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
      }
    },

    toggleImportantById: (state, action) => {
      const task = state.tasksList.find(
        (task) => task._id === action.payload
      );

      if (task) {
        task.important = !task.important;
      }
    },

    deleteTask: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task._id !== action.payload
      );
    },

    addTask: (state, action) => {
      state.tasksList.push(action.payload);
    },

    editTask: (state, action) => {
      const updatedTask = action.payload;

      const index = state.tasksList.findIndex(
        (task) => task._id === updatedTask._id
      );

      if (index !== -1) {
        state.tasksList[index] = updatedTask;
      }
    },
  },
});

export const {
  setTasks,
  setSearchQuery,
  setSortOption,
  toggleCompleteById,
  toggleImportantById,
  deleteTask,
  addTask,
  editTask,
} = taskSlice.actions;

export default taskSlice.reducer;