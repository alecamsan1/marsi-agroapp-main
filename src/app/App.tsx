import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="w-full max-w-[393px] h-full sm:h-[852px] bg-white relative overflow-hidden sm:rounded-[3rem] sm:shadow-[0_0_0_8px_#111,0_20px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col mx-auto">
          <RouterProvider router={router} />
        </div>
      </div>
    </AppProvider>
  );
}