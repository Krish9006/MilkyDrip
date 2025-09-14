import React, { useState, useEffect } from "react";
import PopUpComponent from "./PopUpComponent";
import { useNavigate } from "react-router-dom";

function LoginCmp() {
  const [msg, setMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  // Optional: Preload a default user in localStorage for testing
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      const defaultUsers = [
        { username: "imawadh", password: "123" },
        // Add more users if needed
      ];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }, []);

  const verifyUser = (e) => {
    e.preventDefault(); // prevent form reload

    const username = userName.trim();
    const password = pwd.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    let newMsg = "";

    if (!users.some((u) => u.username === username) && !users.some((u) => u.password === password)) {
      newMsg = "Both Username and Password are incorrect";
    } else if (!users.some((u) => u.username === username)) {
      newMsg = "Missing Correct User Name";
    } else if (!users.some((u) => u.password === password)) {
      newMsg = "Missing Correct Pwd";
    } else if (user) {
      newMsg = "Login Successful";
      // Optional: save login status in localStorage
      localStorage.setItem("loggedInUser", username);
      setTimeout(() => {
        navigate("/"); // redirect after 2 seconds
      }, 2000);
    }

    // Reset message first to force re-render
    setMsg("");
    setTimeout(() => setMsg(newMsg), 10);

    // Clear input fields
    setUserName("");
    setPwd("");
  };

  return (
    <>
      {/* Popup renders here */}
      {msg && <PopUpComponent msg={msg} />}

      <form
        className="max-w-sm mx-auto mt-6 p-6 border rounded-lg shadow-md bg-white"
        onSubmit={verifyUser}
      >
        {/* User Name */}
        <div className="mb-4 text-left">
          <label htmlFor="username" className="block font-medium mb-1">
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your user name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 text-left">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-bold py-2 rounded hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LoginCmp;
