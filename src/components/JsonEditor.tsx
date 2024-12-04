import { hover } from "@testing-library/user-event/dist/hover";
import React, { useState } from "react";

interface JsonEditorProps {
  json: string;
  onChange: (json: string) => void;
  error: string | null;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ json, onChange, error }) => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(json);
      alert("JSON copied to clipboard!");
    };
  
    return (
      <div className="w-full p-4">
  <textarea 
    value={json}
    onChange={(e) => onChange(e.target.value)}
    className="w-full h-[80vh]  p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
    placeholder="Enter JSON here..."
  />
  {error && <p className="text-red-500 mt-2">{error}</p>}
  <button
    onClick={copyToClipboard}
    className="mt-4 w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
  >
    Copy JSON
  </button>
</div>

    );
  };
  



export default JsonEditor;
