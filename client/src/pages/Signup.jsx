import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API_URL from "../API/api";

const Signup = () => {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      setServerError("");

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create account"
        );
      }

      navigate("/login");
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-slate-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-100 bg-gray-300 dark:bg-slate-800 rounded p-6"
      >
        <h1 className="text-slate-700 dark:text-slate-300 font-medium text-xl">
          Create an account
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Sign up to start managing your tasks
        </p>

        <label
          htmlFor="username"
          className="block text-gray-600 dark:text-gray-400 text-sm mt-5"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          placeholder="e.g. Niloufar"
          className="bg-gray-100 dark:bg-slate-600 dark:text-white w-full mt-1 h-10 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500"
          {...register("username", {
            required: "username is required",
          })}
        />

        {errors.username && (
          <p className="text-rose-500 text-sm">
            {errors.username.message}
          </p>
        )}

        <label
          htmlFor="email"
          className="block text-gray-600 dark:text-gray-400 text-sm mt-3"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="e.g. example@email.com"
          className="bg-gray-100 dark:bg-slate-600 dark:text-white w-full mt-1 h-10 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500"
          {...register("email", {
            required: "email is required",
          })}
        />

        {errors.email && (
          <p className="text-rose-500 text-sm">
            {errors.email.message}
          </p>
        )}

        <label
          htmlFor="password"
          className="block text-gray-600 dark:text-gray-400 text-sm mt-3"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="bg-gray-100 dark:bg-slate-600 dark:text-white w-full mt-1 h-10 px-3 rounded text-sm focus:outline-none focus:border-2 focus:border-violet-500"
          {...register("password", {
            required: "password is required",
          })}
        />

        {errors.password && (
          <p className="text-rose-500 text-sm">
            {errors.password.message}
          </p>
        )}

        {serverError && (
          <p className="text-rose-500 text-sm mt-3">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-6 h-10 bg-violet-500 rounded text-gray-100 cursor-pointer hover:bg-violet-600 active:bg-violet-700 text-sm"
        >
          Sign up
        </button>

        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-500 hover:text-violet-600"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;