import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { closeLogoutModal } from "../redux/slices/modalSlice";

function LogoutModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch(closeLogoutModal());

    navigate("/login");
  };

  const handleCancel = () => {
    dispatch(closeLogoutModal());
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-90 bg-gray-100 dark:bg-slate-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-medium text-slate-700 dark:text-gray-200">
          Are you sure?
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          You will be logged out of your account.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 h-9 rounded text-sm text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 h-9 rounded text-sm text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-700 cursor-pointer"
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;