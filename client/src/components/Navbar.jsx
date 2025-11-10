import React, { useState } from "react";
import AddTaskButton from "./AddTaskButton";
import { useDispatch } from "react-redux";
import { openBurgerMenu } from "../redux/slices/modalSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { openSecondSidebar } from "../redux/slices/modalSlice";

function Navbar() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const route = location.pathname;
  const tasksData = useSelector((store) => store.tasks);
  const titles = {
    "/" : `All tasks (${tasksData.length} tasks)`,
    "/important" : `Important tasks (${tasksData.filter(task => task.isImportant).length} tasks)`,
    "/completed" : `Completed tasks (${tasksData.filter(task => task.isCompleted).length} tasks)`,
    "/uncompleted" : `Uncompleted tasks (${tasksData.filter(task => !task.isCompleted).length} tasks)`,
    "/main" : `Main tasks (${tasksData.filter(task => task.directory === "Main").length} tasks)`,
    "/secondary" : `Secondary tasks (${tasksData.filter(task => task.directory === "Secondary").length} tasks)`
  }

  return (
    <div className="w-full mb-10">
      <div className="md:flex md:justify-between mb-6 md:items-center ">
        <div className="md:flex md:items-center">
           <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="gray"
        className="size-6 md:hidden md:mr-3 cursor-pointer hover:stroke-gray-800"
        onClick={() => dispatch(openBurgerMenu())}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
      <div className="md:hidden top-0 fixed left-1/2 -translate-x-1/2 top-3">
        <p className="text-sm text-slate-700 font-medium ">TO-DO LIST</p>
        <p className="text-sm text-gray-500 md:hidden ">
          {new Date().getFullYear()},{" "}
          {new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="relative mt-5 md:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="gray"
            className="size-4 absolute right-4 top-3"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            type="text"
            placeholder="Search task"
            className="bg-gray-100 md:w-55 w-full h-10 rounded-sm text-sm pl-4"
          />
        </div>
        </div>
        <p className="text-sm text-gray-500 hidden md:inline">
          {new Date().getFullYear()},{" "}
          {new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="absolute bottom-5 sm:top-3 right-4 md:static ">
          <AddTaskButton width="w-30" />
        </div>
      </div>
      <div className="mb-6">
        <h3 className="md:text-lg text-slate-700 font-medium text-center sm:text-start text-md">
         {titles[route]} 
        </h3>
        <img
          src="./user-profile.jpeg"
          alt="user profile picture"
          className="rounded-full w-9 h-9 lg:hidden absolute right-6 sm:top-31 top-4 md:top-20 cursor-pointer"
          onClick={() => dispatch(openSecondSidebar())}
        />
      </div>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <button className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="gray"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="rgb(139, 92, 246)"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className={`bg-gray-100 w-35 h-9 text-sm text-gray-500 rounded-sm text-left pl-3 relative hover:border-2 hover:border-violet-500 ${
              isSortOpen ? "border-2 border-violet-500" : ""
            }`}
          >
            Sort by
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4}
              stroke="currentColor"
              className={`size-3 absolute right-2 top-3 transition-transform duration-200 ${
                isSortOpen ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {isSortOpen && (
            <ul className="bg-gray-100 rounded-sm text-sm text-gray-500 shadow-lg z-10 absolute w-35">
              <li className="h-6 hover:bg-blue-500 cursor-pointer block hover:text-white pl-3 flex items-center">
                Sort by
              </li>
              <li className="h-6 hover:bg-blue-500 cursor-pointer block hover:text-white pl-3 flex items-center">
                Order added
              </li>
              <li className="h-6 hover:bg-blue-500 cursor-pointer block hover:text-white pl-3 flex items-center">
                Earlier first
              </li>
              <li className="h-6 hover:bg-blue-500 cursor-pointer block hover:text-white pl-3 flex items-center">
                Later first
              </li>
              <li className="h-6 hover:bg-blue-500 cursor-pointer block hover:text-white pl-3 flex items-center">
                Completed first
              </li>
              <li className="h-6 hover:bg-blue-500 cursor-pointer block hover:text-white pl-3 flex items-center">
                Uncompleted first
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
