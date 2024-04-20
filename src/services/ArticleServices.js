import axios from "./CustomAxios";

const uploadArticle = async (user, desc, file, image) => {
  // console.log(file);
  // console.log(image);
  // console.log(name);

  try {
    const formData = new FormData();
    formData.append("desc", desc);
    formData.append("date", new Date());
    formData.append("status", "Reviewing");
    formData.append("uId", user.id);
    formData.append("fId", user.faculty.id);
    formData.append("uId", null);
    formData.append("file", file);
    formData.append("image", image);
    const res = await axios.post("/articles/create", formData);
    return res;
  } catch (error) {
    console.error("server error:", error);
    return;
  }
};

const comment = async (id, comment) => {
  try {
    const res = await axios.put(`/articles/comment/${id}`, {
      comment: comment,
    });
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

const getImage = async (path) => {
  const newPath = path.split("\\")[1];
  await axios.get(`/images/${newPath}`);
};

const getAnArticle = async (id) => {
  try {
    const res = await axios.get(`/articles/id/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { uploadArticle, deleteArticle, getImage, comment, getAnArticle };
