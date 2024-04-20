import axios from "./CustomAxios";

const fetchingFaculty = async () => {
  try {
    const response = await axios.get("/faculties");
    return response;
  } catch (error) {
    console.error("Login error:", error.name);
    return;
  }
};

const fetchingSingleFaculty = async (id) => {
  try {
    const response = await axios.get(`/faculties/id/${id}`);
    return response;
  } catch (error) {
    console.error("Login error:", error.name);
    return;
  }
};

const updateFacultyName = async (id, newName) => {
  try {
    const res = await axios.put(`faculties/update/${id}`, { name: newName });
    return res;
  } catch (error) {
    console.error("Login error:", error.name);
    return;
  }
};

const addNewFaculty = async (name) => {
  try {
    const response = await axios.post("/faculties/create", {
      name: name,
    });
    return response.name;
  } catch (error) {
    console.error("Login error:", error.name);
    return;
  }
};

const deleteFaculty = async (id) => {
  try {
    const response = await axios.delete(`/faculties/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Delete Failed", error);
    return;
  }
};

export {
  fetchingFaculty,
  addNewFaculty,
  updateFacultyName,
  fetchingSingleFaculty,
  deleteFaculty,
};
