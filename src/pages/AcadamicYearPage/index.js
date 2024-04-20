import React, { useEffect, useState } from "react";
import * as YearService from "../../services/YearService";
import AddButton from "../../component/AddButton";
import MoodleYear from "../../component/MoodleYears";
import { toast } from "react-toastify";
const Year = () => {
  const [yearsList, setYearsList] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    fetchingYearsData();
  }, [change]);

  const fetchingYearsData = async () => {
    const res = await YearService.fetchingYearsData();
    setYearsList(res);
  };

  const [showToggle, setShowToggle] = useState(false);
  function handleToggle() {
    setShowToggle(!showToggle);
  }

  const handleDelete = async (id) => {
    const year = await YearService.fetchingYearDetail(id);
    let detail = new Date(year);
    detail = detail.getFullYear();

    if (detail <= 2024) {
      toast.error(
        "For some reason, you are currently unable to delete this year. There might be a technical issue !"
      );
    } else {
      const res = await YearService.deleteYear(id);
      if (res) {
        setChange(!change);
      }
    }
  };

  return (
    <>
      <MoodleYear
        show={showToggle}
        handleToggle={handleToggle}
        handleChange={() => setChange(!change)}
      />
      <p className=" text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ml-4 my-10">
        Contributions List:
      </p>
      <div className="grid m-auto px-4 gap-x-8 gap-y-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-black border">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 ">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                ID
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Year
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {yearsList.map((year, index) => {
              return (
                <tr key={index} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap "
                  >
                    {year.id}
                  </th>
                  <td className="text-center px-6 py-4">{year.year}</td>
                  <td className="text-center px-6 py-4">
                    <a
                      id={year.id}
                      onClick={() => handleDelete(year.id)}
                      type="button"
                      style={{ cursor: "pointer" }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-center ">
          <button
            onClick={handleToggle}
            className="w-60 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Add new academic year
          </button>
        </div>
      </div>
    </>
  );
};

export default Year;
