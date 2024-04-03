import React from "react";
import "./card.css";
import images from "../../assets";

function Card() {
  return (
    <div className="w-fit text-center shadow-lg m-4">
      <img src={images.thumbnail} alt="Article" style={{ width: "100%" }}></img>
      <h1 className="text-3xl text-gray-900">Tailored Jeans</h1>
      <p className="price text-green-700 text-center underline">Approve</p>
      <a className="font-medium text-blue-600 hover:underline">
        heeps://Article.com.vn
      </a>
      <div className="flex items-center justify-center">
        <button className="w-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Edit
        </button>
        <button className="w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
