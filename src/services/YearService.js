import axios from "./CustomAxios";

const fetchingYearsData = async () => {
  try {
    const response = await axios.get("/years");
    return response;
  } catch (error) {
    console.error("Login error:", error.name);
    return;
  }
};

const fetchingYearDetail = async (id) => {
  try {
    const res = await axios.get(`/years/${id}`);
    return res;
  } catch (error) {
    console.error("Login error:", error.name);
    return;
  }
};

const addNewYear = async (year) => {
  try {
    const response = await axios.post("/years/create", {
      year: year,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.name);
    return;
  }
};

const deleteYear = async (id) => {
  try {
    const response = await axios.delete(`/years/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return;
  }
};

export { fetchingYearsData, addNewYear, deleteYear, fetchingYearDetail };
