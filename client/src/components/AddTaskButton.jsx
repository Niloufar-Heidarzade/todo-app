import React from 'react'

function AddTaskButton(props) {
  return (
    <button className={`text-sm relative flex h-[42px] ${props.width} items-center justify-center overflow-hidden bg-violet-500 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-violet-600 before:duration-200 before:ease-out  hover:before:h-56 hover:before:w-full rounded`}>
      <span className="relative z-10">Add new task</span>
    </button>
  )
}

export default AddTaskButton