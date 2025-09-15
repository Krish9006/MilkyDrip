import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopUpComponent from "../Components/PopUpComponent";

function ArtistLogin() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // ✅ When user selects a file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/svg+xml")
    ) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Only JPEG, PNG, or SVG files are allowed!");
      setSelectedFile(null);
      setPreview(null);
    }
  };

  // ✅ When user clicks Upload
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    setMsg("🎨 Design added");
  };

  // ✅ Redirect to home after popup disappears
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        navigate("/"); // go to home
      }, 2200); // slightly more than popup (2s)

      return () => clearTimeout(timer);
    }
  }, [msg, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Artist Login Page</h1>

      {/* Upload Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md flex flex-col items-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition"
        >
          <span className="text-gray-600">Click or Drag & Drop to Select File</span>
          <input
            id="file-upload"
            type="file"
            accept=".jpeg, .png, .svg"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Preview */}
        {preview && (
          <div className="mt-4 w-full">
            <p className="text-gray-700 text-sm font-medium">Preview:</p>
            <img
              src={preview}
              alt="Uploaded Preview"
              className="mt-2 rounded-xl w-full max-h-64 object-contain border"
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Upload
        </button>
      </div>

      {/* PopUpComponent */}
      <PopUpComponent msg={msg} />
    </div>
  );
}

export default ArtistLogin;
