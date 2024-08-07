// src/Home.js

import React from "react";
import img from "./homeimg.png";

const Home = () => {
  return (
    <div className=" flex flex-col items-center  p-4">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="p-8 flex flex-col lg:flex-row items-center text-center lg:text-left">
          <div className="flex-1 mb-6 lg:mb-0 lg:pr-8">
            <h1 className="text-5xl font-bold text-blue mb-4 font-black">
              Hello, Dr. Harish Kawatra!
            </h1>
            <p className="text-2xl text-zinc-900 font-normal">
              Welcome to your patient management system. Manage your patient records, visit history, medical history, and more efficiently.
            </p>
          </div>
          <div className="flex-1">
            <img
              src={img}
              alt="Welcome illustration"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
