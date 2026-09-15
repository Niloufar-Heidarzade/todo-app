import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { closeEditTaskModal } from "../redux/slices/modalSlice";
import { editTask } from "../redux/slices/taskSlice";
import API_URL from "../API/api";
import authFetch from "../API/authFetch";

const EditTaskModal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const directories = useSelector(
    (store) => store.directory.directoriesList
  );

  const task = useSelector(
    (store) => store.modal.selectedTask
  );

  const handleClickOutside = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closeEditTaskModal());
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (task) {
      reset({
        title: task.title || "",
        deadline: task.deadline
          ? task.deadline.split("T")[0]
          : "",
        description: task.description || "",
        dirId:
          typeof task.dirId === "object"
            ? task.dirId?._id
            : task.dirId,
        important: task.important || false,
        completed: task.completed || false,
      });
    }
  }, [task, reset]);

  const onSubmit = async (values) => {
    try {
      const response = await authFetch(
        `${API_URL}/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            deadline: values.deadline,
            dirId: values.dirId,
            important: values.important || false,
            completed: values.completed || false,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update task"
        );
      }

      dispatch(editTask(data.result));

      reset();
      dispatch(closeEditTaskModal());
    } catch (error) {
      console.error(
        "Error updating task:",
        error
      );
    }
  };

  if (!task) return null;

  return (
    <>
      <div
        className="inset-0 fixed w-full h-full z-50 bg-black/50"
        onClick={handleClickOutside}
      ></div>

      <form
        className="w-70 sm:w-100 h-140 fixed bg-gray-300 dark:bg-slate-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-60 rounded p-4"
        ref={modalRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <p className="text-slate-700 font-medium text-lg dark:text-slate-300">
            Edit task
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-5 cursor-pointer hover:stroke-red-500"
            onClick={() =>
              dispatch(closeEditTaskModal())
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <label
          htmlFor="title"
          className="block text-gray-600 text-sm mt-3 dark:text-gray-400"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          placeholder="e.g. study for the test"
          className="bg-gray-100 dark:bg-slate-600 dark:text-white w-full mt-1 h-10 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500"
          {...register("title", {
            required: "title is required",
            minLength: {
              value: 3,
              message:
                "title can't be less than 3 characters",
            },
            maxLength: {
              value: 30,
              message:
                "title can't be more than 30 characters",
            },
          })}
        />

        {errors.title && (
          <p className="text-rose-500 text-sm">
            {errors.title.message}
          </p>
        )}

        <label
          htmlFor="date"
          className="block text-gray-600 text-sm mt-3 dark:text-gray-400"
        >
          Date
        </label>

        <input
          id="date"
          type="date"
          className="bg-gray-100 dark:bg-slate-600 dark:text-white w-full mt-1 h-10 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500"
          {...register("deadline", {
            required: "date is required",
          })}
        />

        <label
          htmlFor="description"
          className="block text-gray-600 text-sm mt-3 dark:text-gray-400"
        >
          Description (optional)
        </label>

        <textarea
          id="description"
          className="bg-gray-100 dark:bg-slate-600 dark:text-white w-full mt-1 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500 pt-3"
          placeholder="e.g. study lesson 5"
          rows="4"
          {...register("description")}
        ></textarea>

        <label
          htmlFor="selectDirectory"
          className="block text-gray-600 text-sm mt-3 dark:text-gray-400"
        >
          Select a directory
        </label>

        <select
          id="selectDirectory"
          className="w-full h-10 bg-gray-100 dark:bg-slate-600 dark:text-white px-3 rounded text-gray-700 outline-none focus:border-2 focus:border-violet-500"
          {...register("dirId", {
            required: "directory is required",
          })}
        >
          {directories.map((dir) => (
            <option key={dir._id} value={dir._id}>
              {dir.name.charAt(0).toUpperCase() +
                dir.name.slice(1)}
            </option>
          ))}
        </select>

        {errors.dirId && (
          <p className="text-rose-500 text-sm">
            {errors.dirId.message}
          </p>
        )}

        <div className="flex items-center mt-3">
          <div className="w-4 h-4 flex items-center justify-center">
            <input
              id="important"
              type="checkbox"
              className="peer outline-none appearance-none w-4 h-4 bg-gray-400 rounded-full"
              {...register("important")}
            />

            <div className="absolute w-2 h-2 bg-red-400 rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none"></div>
          </div>

          <label
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            htmlFor="important"
          >
            Mark as important
          </label>
        </div>

        <div className="flex items-center mt-3">
          <div className="w-4 h-4 flex items-center justify-center">
            <input
              id="complete"
              type="checkbox"
              className="peer outline-none appearance-none w-4 h-4 bg-gray-400 rounded-full"
              {...register("completed")}
            />

            <div className="absolute w-2 h-2 bg-red-400 rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none"></div>
          </div>

          <label
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            htmlFor="complete"
          >
            Mark as completed
          </label>
        </div>

        <button
          className="w-full mt-6 h-10 bg-violet-500 rounded text-gray-100 cursor-pointer hover:bg-violet-600 active:bg-violet-700 text-sm"
          type="submit"
        >
          Edit task
        </button>
      </form>
    </>
  );
};

export default EditTaskModal;