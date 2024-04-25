import React, { useEffect, useState } from "react";
import * as UserServices from "../../services/UserServices";
import * as FacultyService from "../../services/FacultyService";

import Select from "react-select";
import axios from "../../services/CustomAxios";
import { toast } from "react-toastify";

const ModalUser = ({
  showModal,
  setShowModal,
  id,
  change,
  setChange,
  type,
}) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [faculties, setFaculties] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [selectedFac, setSelectedFac] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const optionsGroup = groups.map((group) => {
    // console.table(group);
    return { value: group.id, label: group.name };
  });

  const optionsFac = faculties.map((fac) => {
    return { value: fac.id, label: fac.name };
  });

  const fetchUserData = async () => {
    const token = localStorage.getItem("access_token");
    const res = await UserServices.getDetailsUSer(id, token);
    if (res) {
      // console.table(res);
      setName(res.username);
      setEmail(res.email);
    }
  };

  const fetchFaculties = async () => {
    const res = await FacultyService.fetchingFaculty();
    if (res) {
      setFaculties(res);
    }
  };

  const fetchGroups = async () => {
    const res = await axios.get("/groups");
    if (res) {
      setGroups(res);
    }
  };

  const handleClose = () => {
    setSelectedFac(null);
    setSelectedGroup(null);
    setName("");
    setEmail("");
    setPassword("");
    setShowModal(!showModal);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (selectedFac && selectedGroup) {
      const res = await UserServices.createNewUser(
        email,
        name,
        password,
        selectedGroup.value,
        selectedFac.value
      );
      if (res) {
        setChange(!change);
        setShowModal(!showModal);
        handleClose();
      }
    } else {
      toast.warn("Faculty & Group are requires");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedFac && selectedGroup) {
      const res = await UserServices.updateUser(
        id,
        email,
        name,
        selectedGroup.value,
        selectedFac.value
      );
      if (res) {
        setChange(!change);
        handleClose();
        setShowModal(!showModal);
      }
    } else {
      toast.warn("Faculty & Group are requires");
    }
  };

  useEffect(() => {
    fetchFaculties();
    fetchGroups();
  }, []);

  useEffect(() => {
    if (id) {
      if (type === "edit") {
        fetchUserData();
      }
    }
  }, [change]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-2xl border-slate-900 border-solid border">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    {type == "add" ? "Create New User" : "Edit User Info"}
                  </h3>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="md:p-5 w-full items-center">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Type User name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      ></input>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Group
                      </label>
                      <Select
                        defaultValue={selectedGroup}
                        onChange={setSelectedGroup}
                        options={optionsGroup}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Faculty
                      </label>
                      <Select
                        defaultValue={selectedFac}
                        onChange={setSelectedFac}
                        options={optionsFac}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Email
                      </label>
                      <input
                        type="email"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="email@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      ></input>
                    </div>
                    {type === "add" ? (
                      <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                          Password
                        </label>
                        <input
                          type="password"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="type password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="col-span-2 p-1 flex justify-center">
                      <button
                        type="submit"
                        onClick={type === "add" ? handleAdd : handleUpdate}
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      >
                        {type === "add" ? (
                          <svg
                            className="me-1 -ms-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        ) : (
                          <></>
                        )}
                        {type === "add" ? "Add new user" : "Update"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalUser;
