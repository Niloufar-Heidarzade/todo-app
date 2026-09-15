import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "./components/SideBar";
import SecondSideBar from "./components/SecondSideBar";
import Navbar from "./components/Navbar";

import EditDirectoryModal from "./components/EditDirectoryModal";
import CreateNewDirectoryModal from "./components/CreateNewDirectoryModal";
import DeleteTaskModal from "./components/DeleteTaskModal";
import CardModal from "./components/CardModal";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import DeleteDirectoryModal from "./components/DeleteDirectoryModal";

import All from "./pages/All";
import Important from "./pages/Important";
import Completed from "./pages/Completed";
import Uncompleted from "./pages/Uncompleted";
import Directory from "./pages/Directory";

import { setDirectories } from "./redux/slices/directorySlice";
import { setTasks } from "./redux/slices/taskSlice";
import API_URL from "./API/api";

function App() {
  const dispatch = useDispatch();

  const isEditDirectoryModalOpen = useSelector(
    (store) => store.modal.editDirectoryModal
  );

  const isNewDirectoryModalOpen = useSelector(
    (store) => store.modal.newDirectoryModal
  );

  const isDeleteTaskModalOpen = useSelector(
    (store) => store.modal.deleteTaskModal
  );

  const isCardModalOpen = useSelector(
    (store) => store.modal.cardModal.isOpen
  );

  const isAddTaskModalOpen = useSelector(
    (store) => store.modal.addTaskModal
  );

  const isEditTaskModalOpen = useSelector(
    (store) => store.modal.editTaskModal
  );

  const isDeleteDirectoryModalOpen = useSelector(
    (store) => store.modal.deleteDirectoryModal
  );

  const isDarkMode = useSelector(
    (store) => store.theme.darkMode
  );

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/directories`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to fetch directories"
          );
        }

        dispatch(setDirectories(data));
      } catch (error) {
        console.error(
          "Error fetching directories:",
          error
        );
      }
    };

    fetchDirectories();
  }, [dispatch]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${API_URL}/tasks`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to fetch tasks"
          );
        }

        dispatch(setTasks(data));
      } catch (error) {
        console.error(
          "Error fetching tasks:",
          error
        );
      }
    };

    fetchTasks();
  }, [dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <div className="bg-gray-200 dark:bg-slate-900 flex justify-center">
        <SideBar className="w-2/10" />

        <SecondSideBar />

        <div className="w-full lg:w-19/30 px-4 sm:px-5 md:pl-53 lg:pl-15 pt-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<All />} />
            <Route
              path="/important"
              element={<Important />}
            />
            <Route
              path="/completed"
              element={<Completed />}
            />
            <Route
              path="/uncompleted"
              element={<Uncompleted />}
            />
            <Route
              path="/directory/:dir"
              element={<Directory />}
            />
          </Routes>
        </div>
      </div>

      {isEditDirectoryModalOpen && <EditDirectoryModal />}

      {isNewDirectoryModalOpen && (
        <CreateNewDirectoryModal />
      )}

      {isDeleteTaskModalOpen && <DeleteTaskModal />}

      {isCardModalOpen && <CardModal />}

      {isAddTaskModalOpen && <AddTaskModal />}

      {isEditTaskModalOpen && <EditTaskModal />}

      {isDeleteDirectoryModalOpen && (
        <DeleteDirectoryModal />
      )}
    </BrowserRouter>
  );
}

export default App;
