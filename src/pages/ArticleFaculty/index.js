import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fileDownload from "js-file-download";
import Select from "react-select";

import * as UserServices from "../../services/UserServices";
import axios from "../../services/CustomAxios";

import Card from "../../component/Card";
import MoodleAdd from "../../component/MoodleAddDoc";
import AddButton from "../../component/AddButton";
import { useNavigate } from "react-router-dom";
import ModalComment from "../../component/MoodleComment";

const options = [
  { value: "Reviewing", label: "Reviewing" },
  { value: "Approve", label: "Approve" },
  { value: "Reject", label: "Reject" },
];

const ArticleFaculty = () => {
  const [change, setChange] = useState();
  const [articles, setArticles] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [artId, setArtId] = useState();
  const [cmtContent, setCmtContent] = useState("");

  const user = useSelector((state) => state.user);

  const handleUpdate = async (e, index) => {
    setSelectedOption(e);
    const res = await axios.put(`/articles/update/${index}`, {
      status: e.value,
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    fetchingArticle();
  }, [change]);

  const handleDelete = async (id) => {
    let res = null;
    res = await axios.delete(`/articles/delete/${id}`);
    if (res) {
      setChange(true);
    }
  };

  const handleDownload = async (path) => {
    console.log(path);
    const name = path.split("\\")[1];
    const res = await axios.post(
      `/download`,
      { path: path },
      { responseType: "blob" }
    );
    // console.log(res);
    fileDownload(res, name);
  };

  const fetchingArticle = async () => {
    const res = await UserServices.fetchingFacultyArticle(
      user.access_token,
      user.faculty.id
    );
    // console.log(res);
    const articles = newArticle(res);
    // console.log(articles);
    setArticles(articles);
  };
  const newArticle = (article) => {
    // console.log(article);
    const newArt = article.map((article) => {
      return { ...article, imageFile: article.imageFile.split("\\")[1] };
    });
    // console.log(newArt);
    return newArt;
  };

  const [showCommentForm, setShowCommentForm] = useState(false);
  function handleComment(id, comment) {
    setCmtContent(comment);
    setArtId(id);
    setShowCommentForm(!showCommentForm);
    setChange(!change);
  }
  return (
    <>
      <p className=" text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ml-4 my-10">
        Contributions List:
      </p>
      <ModalComment
        showModal={showCommentForm}
        setShowModal={setShowCommentForm}
        artId={artId}
        setArtId={setArtId}
        change={change}
        setChange={setChange}
      />
      <div className="grid m-auto px-4 gap-x-8 gap-y-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-black border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Short Description
              </th>
              <th scope="col" className="px-6 py-3">
                File
              </th>
              <th scope="col" className="px-6 py-3">
                Submit Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Faculty
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((element, index) => {
              return (
                <tr key={index} className="bg-white border-b">
                  <td
                    scope="row"
                    className="px-6 py-2 font-medium  text-gray-900 whitespace-nowrap "
                  >
                    <p className="mb-2 underline">
                      {element.shortDescription ||
                        "This article have no description"}
                    </p>
                    <img
                      src={`http://localhost:8080/images/${element.imageFile}`}
                      alt="Article"
                      style={{ width: "100%" }}
                    ></img>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      style={{ cursor: "pointer" }}
                      type="button"
                      className="text-blue-400 underline"
                      onClick={() => handleDownload(element.documentFile)}
                    >
                      {element.documentFile.split("\\")[1]}
                    </a>
                  </td>
                  <td className="px-6 py-4">{element.submittedDate}</td>
                  <td className="w-40 justify-center">
                    <Select
                      defaultValue={
                        options[
                          options.findIndex(
                            (option) => option.value === element.reviewStatus
                          )
                        ]
                      }
                      onChange={(e) => handleUpdate(e, element.id)}
                      options={options}
                    />
                    <div className="m-4">
                      <p className="text-base font-medium text-500 leading-7 tracking-tight text-center">
                        {element.comment ? `Comment: ${element.comment}` : ""}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{element.faculty_name}</td>

                  <td className=" flex self-center px-6 flex-col justify-evenly h-44">
                    <div className="h-full flex-col flex justify-evenly">
                      {/* <a
                        id={element.id}
                        type="button"
                        style={{ cursor: "pointer" }}
                        className="block bg-red-500 hover:bg-red-700 text-center text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          handleDelete(element.id);
                        }}
                      >
                        Delete
                      </a> */}
                      <a
                        id={element.id}
                        type="button"
                        style={{ cursor: "pointer" }}
                        className="block bg-green-500 hover:bg-green-700 text-center text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          handleComment(element.id, element.comment)
                        }
                      >
                        Comment
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ArticleFaculty;
