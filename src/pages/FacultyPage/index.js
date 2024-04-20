import React, { Fragment, useEffect, useState } from "react";
import * as FacultyService from "../../services/FacultyService";
import { toast } from "react-toastify";
import MoodleFaculty from "../../component/MoodleFaculty";

const Faculty = () => {
  const [faculties, setFaculty] = useState([]);
  const [change, setChange] = useState(false);
  const [idFac, setIdFac] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchingFaculty();
  }, [change]);

  const fetchingFaculty = async () => {
    const res = await FacultyService.fetchingFaculty();
    setFaculty(res);
  };

  const [showToggle, setShowToggle] = useState(false);
  function handleToggle(id, type) {
    if (type == "update") {
      setType(type);
      if (id) {
        setIdFac(id);
        setShowToggle(!showToggle);
        setChange(!change);
      }
    } else if (type == "add") {
      setType(type);
      setShowToggle(!showToggle);
      setChange(!change);
    }
  }

  const handleDelete = async (id) => {
    const res = await FacultyService.deleteFaculty(id);
    if (res) {
      setChange(!change);
      toast.success("Deleted Sucessfully");
      // console.log(res);
    }
  };

  return (
    <>
      <MoodleFaculty
        show={showToggle}
        handleToggle={setShowToggle}
        change={change}
        setChange={setChange}
        id={idFac}
        type={type}
      />
      <div className="grid m-auto px-4 gap-x-8 gap-y-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-black border">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 ">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                ID
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Faculty Name
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((fac) => {
              return (
                <tr key={fac.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap "
                  >
                    {fac.id}
                  </th>
                  <td className="text-center px-6 py-4">{fac.name}</td>
                  <td className="text-center px-6 py-4">
                    <div className="flex items-center justify-center">
                      <a
                        type="button"
                        style={{ cursor: "pointer" }}
                        className="w-20 mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(fac.id)}
                      >
                        Delete
                      </a>
                      <a
                        type="button"
                        style={{ cursor: "pointer" }}
                        className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleToggle(fac.id, "update")}
                      >
                        Edit
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-center ">
          <button
            className="w-60 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => handleToggle(null, "add")}
          >
            Add new Faculty
          </button>
        </div>
      </div>
    </>
  );
};

export default Faculty;
