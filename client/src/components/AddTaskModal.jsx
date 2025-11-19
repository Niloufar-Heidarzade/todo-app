import React from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { closeAddTaskModal } from "../redux/slices/modalSlice";
import {useForm} from "react-hook-form";
import { addTask } from "../redux/slices/taskSlice";


const AddTaskModal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeAddTaskModal());
    }
  };
  
  const onSubmit = (values) => {
    dispatch(addTask(values));
    reset();
    dispatch(closeAddTaskModal());
  }
  
  const {
    register,
    handleSubmit,
    formState : {errors},
    reset
  } = useForm()

  return (
    <>
      <div
        className="inset-0 fixed w-full h-full z-50 bg-black/50"
        onClick={handleClickOutside}
      >
        {" "}
      </div>
      <form
        className="w-70 sm:w-100 h-140 fixed bg-gray-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-60 rounded p-4"
        ref={modalRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <p className="text-slate-700 font-medium text-lg">Add a task</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-5 cursor-pointer hover:stroke-red-500"
            onClick={() => dispatch(closeAddTaskModal())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <label htmlFor="title" className="block text-gray-600 text-sm mt-3">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. study for the test"
          className="bg-gray-100 w-full mt-1 h-10 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500"
          {...register("title" , {
            required : "title is required",
            minLength : {
              value : 3,
              message : "title can't be less than 3 characters"
            },
            maxLength : {
              value : 30,
              message : "title can't be more than 30 characters"
            }
          })}
        />
        {errors.title && <p className="text-rose-500 text-sm">{errors.title.message}</p>}
        <label htmlFor="date" className="block text-gray-600 text-sm mt-3">
          Date
        </label>
        <input
          id="date"
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          className="bg-gray-100 w-full mt-1 h-10 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500"
          {...register("deadline")}
        />
        <label
          htmlFor="description"
          className="block text-gray-600 text-sm mt-3"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          className="bg-gray-100 w-full mt-1 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500 pt-3"
          placeholder="e.g. study lesson 5"
          rows="4"
          {...register("description")}
        ></textarea>
        <label
          htmlFor="selectDirectory"
          className="block text-gray-600 text-sm mt-3"
        >
          Select a directory
        </label>
        <select id="directory" className="w-full h-10 bg-gray-100 px-3 rounded text-gray-700 outline-none focus:border-2 focus:border-violet-500" {...register("directory")}>
          <option value="Main">Main</option>
          <option value="Secondary">Secondary</option>
        </select>
        <div className="flex items-center mt-3">
          <div className="w-4 h-4 flex items-center justify-center">
            <input
              id="important"
              type="checkbox"
              className="peer outline-none appearance-none w-4 h-4 bg-gray-400 rounded-full"
              {...register("isImportant")}
            />
            <div className="absolute w-2 h-2 bg-red-400 rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none"></div>
          </div>
          <label className="ml-2 text-sm text-gray-700" htmlFor="important">
            Mark as important
          </label>
        </div>
        <div className="flex items-center mt-3">
          <div className="w-4 h-4 flex items-center justify-center">
            <input
              id="complete"
              type="checkbox"
              className="peer outline-none appearance-none w-4 h-4 bg-gray-400 rounded-full"
              {...register("isCompleted")}
            />
            <div className="absolute w-2 h-2 bg-red-400 rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none"></div>
          </div>
          <label className="ml-2 text-sm text-gray-700" htmlFor="complete">
            Mark as completed
          </label>
        </div>
        <button className="w-full mt-6 h-10 bg-violet-500 rounded text-gray-100 cursor-pointer hover:bg-violet-600 active:bg-violet-700 text-sm" type="submit">
          Add a task
        </button>
      </form>
    </>
  );
};

export default AddTaskModal;
