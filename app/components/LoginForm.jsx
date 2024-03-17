"use client";
import React, { useState } from "react";
import { AuthService } from "../api/auth.service";

const LoginForm = ({ setLoggedIn, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const userForm = { username, password };
    try {
      const jwtToken = await AuthService.login(userForm);
      setLoggedIn(true);
      localStorage.setItem("jwtToken", JSON.stringify(jwtToken));
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
      {isLoading ? (
        <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
      </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
