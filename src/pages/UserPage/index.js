import React from "react";

const UserPage = () => {
  return (
    <>
      <div className="grid m-auto px-4 gap-x-8 gap-y-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-black border">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-50 ">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                ID
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Name
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Group
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Faculty
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap "
              >
                1
              </th>
              <td className="text-center px-6 py-4">abc</td>
              <td className="text-center px-6 py-4">Student</td>
              <td className="text-center px-6 py-4">Information Technology</td>

              <td className="text-center px-6 py-4">
                <div className="flex items-center justify-center">
                  <a
                    type="button"
                    style={{ cursor: "pointer" }}
                    className="w-20 mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={() => handleDelete(fac.id)}
                  >
                    Delete
                  </a>
                  <a
                    type="button"
                    style={{ cursor: "pointer" }}
                    className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={() => handleToggle(fac.id, "update")}
                  >
                    Edit
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-center ">
          <button
            className="w-60 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            // onClick={() => handleToggle(null, "add")}
          >
            Add new User
          </button>
        </div>
      </div>
    </>
  );
};

export default UserPage;
