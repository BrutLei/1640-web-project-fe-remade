import React from "react";

const Year = () => {
  return (
    <>
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
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default Year;
