import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
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
import LogoutModal from "./components/LogoutModal";

import All from "./pages/All";
import Important from "./pages/Important";
import Completed from "./pages/Completed";
import Uncompleted from "./pages/Uncompleted";
import Directory from "./pages/Directory";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

import { setDirectories } from "./redux/slices/directorySlice";
import { setTasks } from "./redux/slices/taskSlice";
import API_URL from "./API/api";
import authFetch from "./API/authFetch";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/tasks" replace />;
  }

  return children;
}

function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const response = await authFetch(
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
        const response = await authFetch(
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

  return (
    <div className="bg-gray-200 dark:bg-slate-900 flex justify-center">
      <SideBar className="w-2/10" />

      <SecondSideBar />

      <div className="w-full lg:w-19/30 px-4 sm:px-5 md:pl-53 lg:pl-15 pt-5">
        <Navbar />

        <Routes>
          <Route path="/tasks" element={<All />} />

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
  );
}

function App() {
  const isDarkMode = useSelector(
    (store) => store.theme.darkMode
  );

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

  const isLogoutModalOpen = useSelector(
    (store) => store.modal.logoutModal
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Welcome />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>

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

      {isLogoutModalOpen && <LogoutModal />}
    </BrowserRouter>
  );
}

export default App;