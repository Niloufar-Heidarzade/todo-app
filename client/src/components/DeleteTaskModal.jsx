import React from "react";
import { useDispatch , useSelector} from "react-redux";
import { closeDeleteTask } from "../redux/slices/modalSlice";
import { useRef } from "react";
import {deleteTask} from "../redux/slices/taskSlice"

function DeleteTaskModal() {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const id = useSelector((store) => store.modal.selectedTask).id;

  const closeIfClickOutside = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeDeleteTask());
    }
  }

  return (
    <>
      <div className="inset-0 fixed bg-black/50 z-50" onClick={closeIfClickOutside}></div>
      <div className="fixed top-1/2 left-1/2 z-60 transform -translate-x-1/2 -translate-y-1/2  bg-gray-200 w-70 sm:w-98 h-41 rounded-sm py-5 px-4" ref={modalRef}>
        <div className="flex justify-between">
          <h1 className="text-slate-700 font-medium">Are you sure?</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-5 cursor-pointer"
            onClick={() => dispatch(closeDeleteTask())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500 mt-5">This task will be deleted permanently.</p>
        <button className="text-sm text-gray-500 cursor-pointer mr-1 w-20 h-9 rounded-sm hover:border-2 hover:border-violet-500" onClick={() => dispatch(closeDeleteTask())}>
          Cancel
        </button>
        <button className="bg-violet-500 text-white text-sm w-20 h-9 rounded-sm mt-5 cursor-pointer transform hover:bg-violet-700 duration-200 " onClick={() => {
          dispatch(deleteTask(id));
          dispatch(closeDeleteTask());
        }}>
          Confirm
        </button>
      </div>
    </>
  );
}

export default DeleteTaskModal;
