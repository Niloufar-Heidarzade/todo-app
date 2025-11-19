import React from "react";
import {useDispatch} from "react-redux";
import {closeNewDirectory} from "../redux/slices/modalSlice";
import {useRef} from "react";

function CreateNewDirectoryModal() {
  const dispatch = useDispatch();
  const modalRef=useRef();
  const closeIfClickOutside = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeNewDirectory());
    }
  }
  return (
    <>
      <div
        className="inset-0 fixed bg-black/50 z-50"
        onClick={closeIfClickOutside}
      ></div>
      <div
        className="z-60 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-70 sm:w-90 h-46 rounded-sm py-5 px-4"
        ref = {modalRef}
      >
        <div className="flex justify-between">
          <h1 className="text-slate-700 font-medium">Create new directory</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-5 cursor-pointer"
            onClick={() => dispatch(closeNewDirectory())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <label htmlFor="directory" className="block mt-3 text-sm text-gray-600">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter a directory name"
          className="bg-gray-50 w-full h-9 rounded-sm pl-2 text-sm focus:outline-none focus:border-1 focus:border-violet-500"
          id="directory"
        />
        <button className="bg-violet-500 text-white text-sm w-15 h-9 rounded-sm mt-5 cursor-pointer transform hover:bg-violet-700 duration-200 ">
          Create
        </button>
      </div>
    </>
  );
}

export default CreateNewDirectoryModal;
