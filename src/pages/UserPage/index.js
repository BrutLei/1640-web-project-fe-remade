import React, { useEffect, useState } from "react";
import * as UserServices from "../../services/UserServices";
import ModalUser from "../../component/MoodleUser";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [showToggle, setShowToggle] = useState(false);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const currentUser = useSelector((state) => state.user);

  const fetchAllUser = async () => {
    const token = localStorage.getItem("access_token");
    const res = await UserServices.getAllUsers(token);
    if (res) {
      const configRes = res.filter((user) => user.id !== currentUser.id);
      // console.table(res);
      setUsers(configRes);
    }
  };

  const handleToggle = async (id, type) => {
    setIdUser(id);
    setType(type);
    setChange(!change);
    setShowToggle(!showToggle);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    const res = await UserServices.deleteUser(id, token);

    if (res) {
      toast.success(res);
      setChange(!change);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, [change]);
  return (
    <>
      <ModalUser
        showModal={showToggle}
        setShowModal={setShowToggle}
        id={idUser}
        change={change}
        setChange={setChange}
        type={type}
      />
      <div className="flex justify-center items-center">
        <div className="relative w-full mx-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Student Name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="grid mx-auto my-5 px-4 gap-x-8 gap-y-6">
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
                Email
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
            {users
              .filter((user) => {
                return search.toLowerCase() === ""
                  ? user
                  : user.username.toLowerCase().includes(search);
              })
              .map((user) => {
                return (
                  <tr key={user.id} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap "
                    >
                      {user.id}
                    </th>
                    <td className="text-center px-6 py-4">{user.username}</td>
                    <td className="text-center px-6 py-4">{user.email}</td>
                    <td className="text-center px-6 py-4">{user.group}</td>
                    {user.faculty === "NOT" ? (
                      <td className="text-center px-6 py-4 text-teal-500 uppercase">
                        {user.faculty === "NOT"
                          ? "Does not belong to the faculty"
                          : user.faculty}
                      </td>
                    ) : (
                      <td className="text-center px-6 py-4 ">{user.faculty}</td>
                    )}
                    <td className="text-center px-6 py-4">
                      <div className="flex items-center justify-center">
                        <a
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="w-20 mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </a>
                        <a
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          // onClick={() => handleToggle(fac.id, "update")}
                          onClick={() => handleToggle(user.id, "edit")}
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
            // onClick={() => handleToggle(null, "add")}
            onClick={() => handleToggle(null, "add")}
          >
            Add new User
          </button>
        </div>
      </div>
    </>
  );
};

export default UserPage;
