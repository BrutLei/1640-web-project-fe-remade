import Cookies from "js-cookie";
import axios from "./CustomAxios";
import { useSelector } from "react-redux";

const uploadArticle = async (user, name, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", name);
    formData.append("date", new Date());
    formData.append("status", "Reviewing");
    formData.append("uId", user.id);
    formData.append("fId", user.faculty.id);
    formData.append("uId", null);

    const res = await axios.post("/articles/create", formData);
    return res;
  } catch (error) {
    console.error("server error:", error);
    return;
  }
};
const deleteArticle = async (Id) => {
  try {
    const id = parseInt(Id);
    const res = await axios.delete(`/articles/delete/${id}`);
    return res;
  } catch (error) {
    console.error("server error:", error);
    return;
  }
};

export { uploadArticle, deleteArticle };
