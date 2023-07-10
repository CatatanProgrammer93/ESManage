import { useState } from "react";
import logo from "./assets/logo.svg";
import ellipse from "./assets/ellipse.svg";
import ellipse2 from "./assets/ellipse-2.svg";
import google from "./assets/google.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="bg-primary max-h-full">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="w-1/2">
              <img src={logo} alt="logo" className="w-1/2 mx-auto" />
              <h1 className="text-4xl text-center text-white font-bold">
                Welcome to <br /> <span className="text-secondary">React</span>{" "}
                Starter Kit
              </h1>
              <p className="text-center text-white text-lg">
                A simple react starter kit with tailwindcss and webpack
              </p>
              <div className="flex justify-center items-center">
                <img src={ellipse} alt="ellipse" className="w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
