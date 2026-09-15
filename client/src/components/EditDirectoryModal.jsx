import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { closeEditDirectory } from "../redux/slices/modalSlice";
import { editDirectory } from "../redux/slices/directorySlice";
import API_URL from "../API/api";

function EditDirectoryModal() {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const current = useSelector(
    (store) => store.directory.currentDirectory
  );

  const directories = useSelector(
    (store) => store.directory.directoriesList
  );

  const currentDirectory = directories.find(
    (directory) => directory._id === current
  );

  const closeIfClickOutside = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closeEditDirectory());
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await fetch(
        `${API_URL}/directories/${current}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.directoryNewName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update directory"
        );
      }

      dispatch(editDirectory(data.result));

      reset();
      dispatch(closeEditDirectory());
    } catch (error) {
      console.error("Error updating directory:", error);
    }
  };

  return (
    <>
      <div
        className="inset-0 fixed bg-black/50 z-50"
        onClick={closeIfClickOutside}
      ></div>

      <form
        className="z-60 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-70 sm:w-90 h-46 rounded-sm py-5 px-4 dark:bg-slate-800"
        ref={modalRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="text-slate-700 font-medium dark:text-slate-300">
            Edit directory name
          </h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-5 cursor-pointer"
            onClick={() => dispatch(closeEditDirectory())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <label
          htmlFor="directory"
          className="block mt-3 text-sm text-gray-600 dark:text-gray-400"
        >
          Title
        </label>

        <input
          type="text"
          placeholder={currentDirectory?.name || ""}
          className="bg-gray-50 dark:bg-slate-600 dark:text-white w-full h-9 rounded-sm pl-2 text-sm focus:outline-none focus:border-1 focus:border-violet-500"
          id="directory"
          {...register("directoryNewName", {
            required: "Enter a name please!",
            maxLength: {
              value: 10,
              message:
                "Directory name can't be more than 10 characters!",
            },
          })}
        />

        {errors.directoryNewName && (
          <p className="text-sm text-rose-500">
            {errors.directoryNewName.message}
          </p>
        )}

        <button
          className="bg-violet-500 text-white text-sm w-15 h-9 rounded-sm mt-3 cursor-pointer transform hover:bg-violet-700 duration-200"
          type="submit"
        >
          Edit
        </button>
      </form>
    </>
  );
}

export default EditDirectoryModal;