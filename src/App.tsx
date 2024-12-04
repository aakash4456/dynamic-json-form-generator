import React, { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [dark, setdark] = useState(false);
  
  return (
    <div className={dark ? "dark dark:bg-neutral-700" : ''}>
      <button className="button button-border p-2 
                        w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900 transition duration-200
                        dark:bg-gray-300
                        dark:text-gray-900" onClick={()=> setdark(!dark)}>Mode</button>
      <Home />
    </div>
  );
}

export default App;
