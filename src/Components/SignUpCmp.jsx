import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUpComponent from "./PopUpComponent";

function SignUpCmp() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const verifyUser = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.some((user) => user.username === username.trim())) {
      setMsg("User already exists. Please choose a different username.");
      return;
    }

    // Check if passwords match
    if (password.trim() !== confirmPassword.trim()) {
      setMsg("Passwords do not match.");
      return;
    }

    // Create new user object
    const newUser = {
      username: username.trim(),
      fullName: fullName.trim(),
      password: password.trim(),
    };

    // Save new user to localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMsg("Sign Up Successful!");

    // Clear form fields
    setUsername("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");

    // Redirect to main page after 2 seconds
    setTimeout(() => {
      navigate("/"); // change "/" to your main page route
    }, 2000);
  };

  return (
    <>
      {/* Popup renders here */}
      {msg && <PopUpComponent msg={msg} />}

      <form
        className="max-w-sm mx-auto mt-6 p-6 border rounded-lg shadow-md bg-white"
        onSubmit={verifyUser}
      >
        {/* Username */}
        <div className="mb-4 text-left">
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Full Name */}
        <div className="mb-4 text-left">
          <label htmlFor="name" className="block font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 text-left">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6 text-left">
          <label htmlFor="confirmPassword" className="block font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white font-bold py-2 rounded hover:bg-green-800 transition"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUpCmp;
