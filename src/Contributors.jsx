import React from "react";
import { FaUser } from "react-icons/fa";
const Contributors = () => {
  return (
    <div className="w-48 h-16 border-4 border-dashed px-4 py-1 rounded-3xl grid grid-cols-[30%_78%] items-center shadow-sm hover:bg-slate-200 cursor-pointer transition-all duration-300 ">
      <div className="rounded-full border-4 border-dashed w-10 h-10 flex items-center justify-center ">
        <FaUser size={"24"} color="#6b6b6b" />
      </div>
      <div className="font-bold text-stone-400">
        <h1>You name here</h1>
      </div>
    </div>
  );
};

export default Contributors;
