import axios from "./CustomAxios";

const fetchingDeadlineData = async () => {
  try {
    const res = await axios.get("/closedates");
    return res;
  } catch (error) {
    console.error("server error:", error);
    return;
  }
};

export { fetchingDeadlineData };
