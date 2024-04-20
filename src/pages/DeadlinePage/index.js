import React, { useEffect, useState } from "react";
import ModalDeadline from "../../component/MoodleDeadline";
import * as DeadlineService from "../../services/CloseDateService";

const DeadlinePage = () => {
  const [deadline, setDeadline] = useState([]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const fetchingDeadLine = async () => {
    const res = await DeadlineService.fetchingDeadlineData();
    const configRes = res.map((e) => {
      const newDate = new Date(e.closingDate);
      console.log(newDate.toLocaleDateString(undefined, options));
      return {
        ...e,
        closingDate: newDate.toLocaleDateString(undefined, options),
      };
    });
    setDeadline(configRes);
  };

  useEffect(() => {
    fetchingDeadLine();
  }, []);
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <h1 className="text-green-600 text-5xl font-bold">Deadline page</h1>
      <div className="flex justify-between items-center mt-2">
        <p>Deadline list:</p>
        <ModalDeadline showModal={showModal} setShowModal={setShowModal} />
      </div>
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-700 font-medium uppercase tracking-wider text-center">
                ID
              </th>
              <th className="px-4 py-2 text-gray-700 font-medium uppercase tracking-wider text-center">
                Academic Year ID
              </th>
              <th className="px-4 py-2 text-gray-700 font-medium uppercase tracking-wider text-center">
                Closing Date
              </th>
              <th className="px-4 py-2 text-gray-700 font-medium uppercase tracking-wider text-center">
                Faculty Name
              </th>
              <th className="px-4 py-2 text-gray-700 font-medium uppercase tracking-wider text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {deadline.map((dl, index) => {
              return (
                <tr>
                  <td className="px-4 py-2 border-b border-gray-200 text-center">
                    {dl.id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-center">
                    {dl.academicYearId}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-center">
                    {dl.closingDate}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-center">
                    {dl.faculty_name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-center">
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-3 border border-red-700 rounded">
                      delete
                    </button>
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

export default DeadlinePage;
