import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { useRef } from "react";
import { useEffect } from "react";
import { closeSecondSidebar } from "../redux/slices/modalSlice";

function SecondSideBar() {
  const isDarkmode = useSelector((store) => store.theme.darkmode);
  const dispatch = useDispatch();
  const numberOfAllTasks = useSelector((store) => store.tasks.length);
  const numberOfDoneTasks = useSelector(
    (store) => store.tasks.filter((task) => task.isCompleted).length
  );
  const isOpen = useSelector((store) => store.modal.secondSidebarModal);
  const progress = (numberOfDoneTasks / numberOfAllTasks) * 100;
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        dispatch(closeSecondSidebar());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div
      className={`h-full lg:flex lg:w-50 bg-neutral-100 shadow-lg fixed top-0 right-0 items-center pt-5 flex-col px-4 ${
        !isOpen && "hidden"
      } lg:block z-50`}
      ref={modalRef}
    >
      <div title="close sidebar " className="cursor-pointer mb-5" onClick={() => dispatch(closeSecondSidebar())}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="gray"
          className="size-4 lg:hidden hover:stroke-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      <div className="h-10 flex items-center gap-3">
        <p className="text-slate-700 text-sm font-medium">Hi, User!</p>
        <img
          src="./user-profile.jpeg"
          alt="user profile picture"
          className="rounded-full w-10 h-10"
        />
      </div>
      <div className="mt-12 w-full flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {isDarkmode ? "Lightmode" : "Darkmode"}
        </p>
        <button
          className="w-10 h-5 bg-gray-300 rounded-full relative"
          onClick={() => dispatch(toggleTheme())}
        >
          <span
            className={`bg-violet-500 w-5 h-5 absolute rounded-full top-0  transform transition-transform  ease-in-out duration-400 ${
              isDarkmode ? "translate-x-0" : "-translate-x-5"
            }`}
          ></span>
        </button>
      </div>
      <div className="w-full mt-10">
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-500">All tasks</p>
          <p className="text-sm text-gray-500">{`${numberOfDoneTasks}/${numberOfAllTasks}`}</p>
        </div>
        <div className="bg-gray-300 w-full h-2 rounded-full">
          <div
            className="bg-violet-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="absolute bottom-6 left-4 w-full">
        <button className="text-xs text-gray-500 cursor-pointer hover:text-red-600">
          Delete all data
        </button>
        <div className="w-10/12 bg-rose-100 h-7 mt-3 rounded-md flex items-center justify-center  cursor-pointer">
          <a
            className="text-red-400 text-xs"
            href="https://github.com/Niloufar-Heidarzade"
          >
            Created by Niloufar
          </a>
        </div>
      </div>
    </div>
  );
}

export default SecondSideBar;
