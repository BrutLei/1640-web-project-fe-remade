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

const options = [
  { value: "Reviewing", label: "Reviewing" },
  { value: "Approve", label: "Approve" },
  { value: "Reject", label: "Reject" },
];

const ArticleTable = ({ handleToggle }) => {
  const [change, setChange] = useState();
  const [articles, setArticles] = useState([]);
  const user = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleUpdate = async (e, index) => {
    console.log(e);
    console.log(index);
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
    console.log(res);
    fileDownload(res, name);
  };

  const fetchingArticle = async () => {
    const res = await UserServices.fetchingArticle(user.access_token);
    console.log(res);
    if (articles) {
      setArticles(res);
    }
  };

  const [showToggle, setShowToggle] = useState(false);
  function handleToggle() {
    setShowToggle(!showToggle);
  }
  return (
    <>
      <p className=" text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ml-4 my-10">
        Contributions List:
      </p>
      <div className="grid m-auto px-4 gap-x-8 gap-y-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-black border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Article Title
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
              console.log(element);
              return (
                <tr key={index} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {element.title}
                  </th>
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
                  <td className="w-40">
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
                  </td>
                  <td className="px-6 py-4">{element.faculty_name}</td>
                  <td className="px-6 py-4">
                    <a
                      id={element.id}
                      type="button"
                      style={{ cursor: "pointer" }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        handleDelete(element.id);
                      }}
                    >
                      Delete
                    </a>
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

export default ArticleTable;
