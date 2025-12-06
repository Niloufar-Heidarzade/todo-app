import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDirectory } from "../redux/slices/modalSlice";
import { useRef } from "react";
import {useForm} from "react-hook-form";
import { editDirectory } from "../redux/slices/directorySlice";

function EditDirectoryModal() {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const current = useSelector((store) => store.directory.currentDirectory);
  const closeIfClickOutside = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeEditDirectory());
    }
  }
  
  const {
    register,
    handleSubmit,
    formState : {errors},
    reset
  } = useForm();

  const onSubmit = (values) => {
    const oldName = current;
    const newName = values.directoryNewName;
    dispatch(editDirectory({oldName , newName}));
    dispatch(closeEditDirectory());
  }

  return (
    <>
      <div className="inset-0 fixed bg-black/50 z-50" onClick={closeIfClickOutside}></div>
      <form className="z-60 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-70 sm:w-90 h-46 rounded-sm py-5 px-4 dark:bg-slate-800" ref={modalRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <h1 className="text-slate-700 font-medium dark:text-slate-300">Edit directory name</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-5"
            onClick={() => dispatch(closeEditDirectory())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <label htmlFor="directory" className="block mt-3 text-sm text-gray-600 dark:text-gray-400">Title</label>
        <input type="text" placeholder={current.charAt(0).toUpperCase() + current.slice(1)} className="bg-gray-50 dark:bg-slate-600 dark:text-white w-full h-9 rounded-sm pl-2 text-sm focus:outline-none focus:border-1 focus:border-violet-500" id="directory" {...register("directoryNewName" , {
          required : "Enter a name plaese!",
          maxLength : {
            value : 10,
            message : "Directory name can't be more than 10 characters!"
          }
        })}/>
        {errors.directoryNewName && <p className="text-sm text-rose-500">{errors.directoryNewName.message}</p>}
        <button className="bg-violet-500 text-white text-sm w-15 h-9 rounded-sm mt-3 cursor-pointer transform hover:bg-violet-700 duration-200 " type="submit">Edit</button>
      </form>
    </>
  );
}

export default EditDirectoryModal;
