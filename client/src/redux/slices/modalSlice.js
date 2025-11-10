import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState:{
    editDirectoryModal : false,
    newDirectoryModal : false,
    deleteTaskModal : false,
    burgerMenuModal : false,
    secondSidebarModal : false,
  },
  reducers: {
    openEditDirectory: (state) => {
      state.editDirectoryModal = true;
    },
    closeEditDirectory: (state) => {
      state.editDirectoryModal = false;
    },
    openNewDirectory: (state) => {
      state.newDirectoryModal = true;
    },
    closeNewDirectory: (state) => {
      state.newDirectoryModal = false;
    },
    openDeleteTask: (state) => {
      state.deleteTaskModal = true;
    },
    closeDeleteTask: (state) => {
      state.deleteTaskModal = false;
    },
    openBurgerMenu: (state) => {
      state.burgerMenuModal = true;
    },
    closeBurgerMenu: (state) => {
      state.burgerMenuModal = false;
    },
    openSecondSidebar: (state) => {
      state.secondSidebarModal = true;
    },
    closeSecondSidebar: (state) => {
      state.secondSidebarModal = false;
    }
  }
})

export const {openEditDirectory , closeEditDirectory , openNewDirectory , closeNewDirectory , openDeleteTask , closeDeleteTask , openBurgerMenu , closeBurgerMenu , openSecondSidebar , closeSecondSidebar} = modalSlice.actions;
export default modalSlice.reducer;