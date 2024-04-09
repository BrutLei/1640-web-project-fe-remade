import React from "react";
import images from "../../assets";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between p-4">
        <img src={images.commonLogo} alt="Logo" className="h-16 w-auto"></img>
        <button onClick={handleLoginClick} className="self-center bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
      <div className="flex items-center justify-center">
         <h1 className="text-4xl font-bold">Welcome To School</h1>
      </div>
      <div className="flex justify-center p-4">
        <img src={images.home} alt="HomePage" className="w-full"></img>
      </div>
    </div>
  );
};

export default HomePage;
