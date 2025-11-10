import React from "react";
import { useDispatch } from "react-redux";
import { toggleCompleteById } from "../redux/slices/taskSlice";
import { toggleImportantById } from "../redux/slices/taskSlice";
import { openDeleteTask } from "../redux/slices/modalSlice";
import { openCardModal } from "../redux/slices/modalSlice";
import { useSelector } from "react-redux";
import { closeCardModal } from "../redux/slices/modalSlice";
import { useRef } from "react";

function CardModal() {

  const dataId = useSelector((store) => store.modal.cardModal.cardData.data.id);
  const data = useSelector((store) => store.tasks.find(task => task.id === dataId))
  const index = useSelector((store) => store.modal.cardModal.cardData.index);
  const dispatch = useDispatch();
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeCardModal());
    };
  };

  return (
    <>
      <div className="inset-0 fixed bg-black/50 z-50 flex w-full h-full justify-center items-center" onClick={handleClickOutside}>
        <div className="w-7/8 md:w-3/5 max-h-[80vh] overflow-y-auto hover:shadow-md relative" ref={modalRef}>
          <div className="absolute w-10 md:w-13 bg-red-200 text-center text-xs md:text-sm text-red-400 rounded-md right-3 -top-6 pt-1 z-0 cursor-pointer duration-200 hover:bg-red-300">
            {data.directory}
          </div>
          <div
            className={`w-full ${
              index === 0 ? "bg-violet-500" : "bg-gray-50"
            } rounded-sm relative z-1 p-4`}
          >
            <div className="mb-3">
              <div className="flex justify-between">
                <p
                className={`${
                  index === 0 ? "text-gray-100" : "text-gray-600"
                } font-medium text-xs md:text-sm mb-2`}
              >
                {data.title}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={index===0 ? "white" : "darkBlue"}
                className="size-5 cursor-pointer"
                onClick={() => dispatch(closeCardModal())}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

              </div>
              
              <p
                className={`${
                  index === 0 ? "text-gray-300" : "text-gray-400"
                } text-xs md:text-sm mt-3 mb-5 leading-7`}
              >
                {data.description}
              </p>
            </div>
            <div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={index === 0 ? "white" : "gray"}
                  className="size-4 md:size-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                <p
                  className={`text-xs md:text-sm ${
                    index === 0 ? "text-gray-100" : "text-gray-400"
                  }`}
                >
                  {data.deadline}
                </p>
              </div>
              <div
                className={`border border-t border-dashed mt-3 ${
                  index === 0 ? "text-gray-400" : "text-gray-200"
                }`}
              ></div>
              <div className="mt-2 flex justify-between items-center">
                <button
                  className={
                    data.isCompleted
                      ? "bg-green-200 rounded-2xl md:rounded-xl w-6 md:w-22 text-sm h-6 text-green-800 cursor-pointer flex justify-center items-center"
                      : "bg-yellow-200 rounded-2xl md:rounded-xl w-6 md:w-25 text-sm h-6 text-yellow-800 cursor-pointer flex justify-center items-center"
                  }
                  onClick={() => dispatch(toggleCompleteById(data.id))}
                  title={
                    data.isCompleted
                      ? "mark as uncompleted"
                      : "mark as completed"
                  }
                >
                  {!data.isCompleted && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 md:hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  {data.isCompleted && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 md:hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  )}

                  <span className="hidden md:inline">
                    {data.isCompleted ? "completed" : "uncompleted"}
                  </span>
                </button>
                <div className="flex gap-1">
                  <div
                    title={
                      data.isImportant
                        ? "mark as unimportant"
                        : "mark as important"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={data.isImportant ? "rgb(250, 90, 105)" : "none"}
                      stroke={
                        data.isImportant
                          ? "none"
                          : index === 0
                          ? "rgb(255,255,255)"
                          : "rgb(82, 82, 122)"
                      }
                      strokeWidth={1.5}
                      className="size-4 md:size-5 cursor-pointer"
                      onClick={() => dispatch(toggleImportantById(data.id))}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div title="delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={
                        index === 0 ? "rgb(255,255,255)" : "rgb(82, 82, 122)"
                      }
                      className="size-4 md:size-5 cursor-pointer"
                      onClick={() => dispatch(openDeleteTask())}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div title="more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={
                        index === 0 ? "rgb(255,255,255)" : "rgb(82, 82, 122)"
                      }
                      className="size-4 md:size-5 cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardModal;
