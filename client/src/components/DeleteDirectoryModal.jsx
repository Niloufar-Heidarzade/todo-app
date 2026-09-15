import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeDeleteDirectoryModal } from "../redux/slices/modalSlice";
import { deleteDirectory } from "../redux/slices/directorySlice";
import { deleteTask } from "../redux/slices/taskSlice";
import API_URL from "../API/api";

function DeleteDirectoryModal() {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const current = useSelector(
    (store) => store.directory.currentDirectory
  );

  const directories = useSelector(
    (store) => store.directory.directoriesList
  );

  const taskList = useSelector((store) => store.tasks);

  const currentDirectory = directories.find(
    (directory) => directory._id === current
  );

  const closeIfClickOutside = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closeDeleteDirectoryModal());
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_URL}/directories/${current}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete directory"
        );
      }

      const tasksToDelete = taskList.filter(
        (task) =>
          task.dirId === current ||
          task.dirId?._id === current
      );

      for (const task of tasksToDelete) {
        const taskResponse = await fetch(
          `${API_URL}/tasks/${task._id}`,
          {
            method: "DELETE",
          }
        );

        if (taskResponse.ok) {
          dispatch(deleteTask(task._id));
        }
      }

      dispatch(deleteDirectory(current));
      dispatch(closeDeleteDirectoryModal());
    } catch (error) {
      console.error("Error deleting directory:", error);
    }
  };

  return (
    <>
      <div
        className="inset-0 fixed bg-black/50 z-50"
        onClick={closeIfClickOutside}
      ></div>

      <div
        className="fixed top-1/2 left-1/2 z-60 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 dark:bg-slate-800 w-70 sm:w-98 h-41 rounded-sm py-5 px-4"
        ref={modalRef}
      >
        <div className="flex justify-between">
          <h1 className="text-slate-700 font-medium dark:text-slate-300">
            Are you sure?
          </h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-5 cursor-pointer"
            onClick={() => dispatch(closeDeleteDirectoryModal())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <p className="text-sm text-gray-500 mt-5">
          {currentDirectory
            ? `"${currentDirectory.name}" will be deleted permanently.`
            : "This directory will be deleted permanently."}
        </p>

        <button
          className="text-sm text-gray-500 cursor-pointer mr-1 w-20 h-9 rounded-sm hover:border-2 hover:border-violet-500"
          onClick={() => dispatch(closeDeleteDirectoryModal())}
        >
          Cancel
        </button>

        <button
          className="bg-violet-500 text-white text-sm w-20 h-9 rounded-sm mt-5 cursor-pointer transform hover:bg-violet-700 duration-200"
          onClick={handleDelete}
        >
          Confirm
        </button>
      </div>
    </>
  );
}

export default DeleteDirectoryModal;