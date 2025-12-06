import React, { useEffect, useState } from "react";
import AddTaskButton from "./AddTaskButton";
import { NavLink } from "react-router-dom";
import { ChevronDown, SquarePen, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { openDeleteDirectoryModal, openEditDirectory } from "../redux/slices/modalSlice";
import { openNewDirectory } from "../redux/slices/modalSlice";
import { useSelector } from "react-redux";
import { closeBurgerMenu } from "../redux/slices/modalSlice";
import { useRef } from "react";
import { setCurrentDirectory } from "../redux/slices/directorySlice";

function SideBar() {
  const [isDirectoriesOpen, setIsDirectoriesOpen] = useState(true);
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.modal.burgerMenuModal);
  const directories = useSelector((store) => store.directory.directoriesList);
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        dispatch(closeBurgerMenu());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className="flex h-screen z-50">
      <div
        className={`
          fixed top-0 left-0 h-full bg-neutral-100 dark:bg-slate-800 shadow-lg
           w-40 md:w-2/10
           ${!isOpen && "hidden"} md:block z-50
        `}
        ref={sidebarRef}
      >
        <h2 className="w-full text-center mt-8 text-slate-700 dark:text-gray-300 font-semibold">
          TO-DO LIST
        </h2>
        <div className="w-full flex justify-center mt-6">
          <AddTaskButton width="w-7/8" />
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "block text-red-500 dark:text-white text-sm w-full mt-4 h-10 flex items-center pl-4 bg-purple-100 dark:bg-slate-700 border-e-4"
              : "block text-gray-500 dark:text-gray-400 text-sm hover:text-red-500 dark:hover:text-white w-full mt-4 h-10 flex items-center pl-4"
          }
        >
          All tasks
        </NavLink>
        <NavLink
          to="/important"
          className={({ isActive }) =>
            isActive
              ? "block text-red-500 dark:text-white text-sm w-full h-10 flex items-center pl-4 bg-purple-100 dark:bg-slate-700 border-e-4"
              : "block text-gray-500 dark:text-gray-400 text-sm hover:text-red-500 dark:hover:text-white w-full h-10 flex items-center pl-4"
          }
        >
          Important tasks
        </NavLink>
        <NavLink
          to="/completed"
          className={({ isActive }) =>
            isActive
              ? "block text-red-500 dark:text-white text-sm w-full h-10 flex items-center pl-4 bg-purple-100 dark:bg-slate-700 border-e-4"
              : "block text-gray-500 dark:text-gray-400 text-sm hover:text-red-500 dark:hover:text-white w-full h-10 flex items-center pl-4"
          }
        >
          Completed tasks
        </NavLink>
        <NavLink
          to="/uncompleted"
          className={({ isActive }) =>
            isActive
              ? "block text-red-500 dark:text-white text-sm w-full h-10 flex items-center pl-4 bg-purple-100 dark:bg-slate-700 border-e-4"
              : "block text-gray-500 dark:text-gray-400 text-sm hover:text-red-500 dark:hover:text-white w-full h-10 flex items-center pl-4"
          }
        >
          Uncompleted tasks
        </NavLink>
        <div>
          <button
            className="h-10 pl-4 text-sm text-gray-500 dark:text-gray-400 flex items-center hover:text-red-500 dark:hover:text-white cursor-pointer"
            onClick={() => {
              setIsDirectoriesOpen(!isDirectoriesOpen);
            }}
          >
            <ChevronDown
              className={
                isDirectoriesOpen
                  ? "w-4 me-1 transition-transform duration-50"
                  : "w-4 me-1 transition-transform duration-50 -rotate-90"
              }
            />
            Dircetories
          </button>
          {isDirectoriesOpen && (
            <div>
              {directories.map((dir) => {
                return (
                  <NavLink
                    to={`/directory/${dir}`}
                    className={({ isActive }) =>
                      isActive
                        ? "group block text-red-500 dark:text-white text-sm w-full h-8 pl-9 bg-purple-100 dark:bg-slate-700 flex items-center border-e-4"
                        : "group block text-gray-500 dark:text-gray-400 text-sm w-full h-8 pl-9 flex items-center"
                    }
                    onClick={() => dispatch(setCurrentDirectory(dir))}
                  >
                    {({ isActive }) => (
                      <>
                        <span className="group-hover:text-red-500 dark:group-hover:text-white">
                          {dir.charAt(0).toUpperCase() + dir.slice(1)}
                        </span>
                        <div
                          className={`ml-auto mr-3 flex ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {dir !== "main" && (
                            <SquarePen
                              className="w-4 mr-2"
                              onClick={() => dispatch(openEditDirectory())}
                            />
                          )}
                          {dir !== "main" && <Trash2 className="w-4 " onClick={() => dispatch(openDeleteDirectoryModal())} />}
                        </div>
                      </>
                    )}
                  </NavLink>
                );
              })}
              <button
                className="text-gray-500 dark:text-gray-400 text-sm h-8 ml-9 border-2 border-dashed border-gray-300 dark:border-gray-600 w-15 mt-3 rounded-sm cursor-pointer hover:text-purple-500"
                onClick={() => dispatch(openNewDirectory())}
              >
                + New
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
