import React, { useState } from "react";
import fileDownload from "js-file-download";

import axios from "../../services/CustomAxios";
import "./card.css";
import images from "../../assets";
import { toast } from "react-toastify";
import ModalCmtView from "../MoodleCommentView";

function Card({
  status,
  title,
  path,
  id,
  image,
  setChange,
  currentStage,
  comment,
}) {
  const [showCmt, setShowCmt] = useState(false);
  // console.log(image);
  const imgId = image?.split("\\")[1];
  // console.log(imgId);
  let name = "";
  if (path) {
    name = path.split("\\")[1];
  }

  const handleDelete = async () => {
    let res = null;
    res = await axios.delete(`/articles/delete/${id}`);
    console.log(res);
    if (res) {
      // window.location.reload(true);
      setChange(!currentStage);
    }
  };

  const handleDownload = async ({ path }) => {
    console.log(path);
    const name = path.split("\\")[1];
    const res = await axios.post(
      `/download`,
      { path: path },
      { responseType: "blob" }
    );
    console.log(res);
    fileDownload(res, name);
  };

  const showCmtMod = () => {
    setShowCmt(!showCmt);
  };

  return (
    <div
      onClick={showCmtMod}
      className="w-fit text-center shadow-lg m-4 cursor-help"
    >
      <ModalCmtView
        showModal={showCmt}
        setShowModal={setShowCmt}
        comment={comment}
      />
      <img
        src={`http://localhost:8080/images/${imgId}` || images.thumbnail}
        alt="Article"
        style={{ height: "250px" }}
      ></img>
      <p className="price text-green-700 text-center underline">
        {status || "Unknown"}
      </p>
      <p className="text-lg text-gray-900 ">{title || "Description"}</p>
      <a className="font-medium text-blue-600 hover:underline">
        {name || `heeps://Article.com.vn`}
      </a>
      <div className="flex items-center justify-center">
        <button
          onClick={() => handleDownload({ path })}
          className="w-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2"
        >
          Download
        </button>
        <button
          onClick={handleDelete}
          className="w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
