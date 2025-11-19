import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState:{
    editDirectoryModal : false,
    newDirectoryModal : false,
    deleteTaskModal : false,
    burgerMenuModal : false,
    secondSidebarModal : false,
    cardModal : {
      isOpen : false,
      cardData : {}
    },
    addTaskModal :false,
    editTaskModal :false,
    selectedTask : null
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
    openDeleteTask: (state , action) => {
      state.deleteTaskModal = true;
      state.selectedTask = action.payload;
    },
    closeDeleteTask: (state) => {
      state.deleteTaskModal = false;
      state.selectedTask = null;
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
    },
    openCardModal: (state , action) => {
      state.cardModal.isOpen = true;
      state.cardModal.cardData = action.payload;
    },
    closeCardModal: (state) => {
      state.cardModal.isOpen = false;
    },
    openAddTaskModal: (state) => {
      state.addTaskModal = true;
    },
    closeAddTaskModal: (state) => {
      state.addTaskModal = false;
    },
    openEditTaskModal: (state , action) => {
      state.editTaskModal = true;
      state.selectedTask = action.payload;
    },
    closeEditTaskModal: (state) => {
      state.editTaskModal = false;
      state.selectedTask = null;
    }
  }
})

export const {openEditDirectory , closeEditDirectory , openNewDirectory , closeNewDirectory , openDeleteTask , closeDeleteTask , openBurgerMenu , closeBurgerMenu , openSecondSidebar , closeSecondSidebar , openCardModal , closeCardModal , openAddTaskModal , closeAddTaskModal , openEditTaskModal , closeEditTaskModal} = modalSlice.actions;
export default modalSlice.reducer;