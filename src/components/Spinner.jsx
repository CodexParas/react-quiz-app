import React from "react";
import { PuffLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-800">
      <PuffLoader color="#498FCD" size={80} />
    </div>
  );
};

export default Spinner;
