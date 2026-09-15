import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-slate-900 flex items-center justify-center px-5">
      <main className="w-full max-w-2xl text-center">
        <p className="text-sm font-medium tracking-widest text-purple-500 uppercase mb-4">
          TO-DO LIST
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-700 dark:text-gray-100 leading-tight">
          Get things done,
          <br />
          one task at a time.
        </h1>

        <p className="mt-5 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Organize your tasks, stay focused, and keep track of
          what matters most.
        </p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-8 inline-flex items-center gap-2 px-6 h-11 rounded-md bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white text-sm font-medium transition-colors cursor-pointer"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </main>
    </div>
  );
}

export default Welcome;