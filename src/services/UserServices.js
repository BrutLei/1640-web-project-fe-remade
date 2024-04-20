import axios from "./CustomAxios";

const login = async (data) => {
  try {
    const { email, password } = data;
    const response = await axios.post(
      "/users/login",
      { email: email, password: password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Login error:", error.name);
    return;
  }
};

const getDetailsUSer = async (id, access_token) => {
  try {
    const res = await axios.get(`/users/get-details/${id}`, {
      headers: {
        token: `Beare ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    console.error("server error:", error.name);
    return;
  }
};

const logout = async () => {
  try {
    const res = await axios.post("/set-cookie");
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

const fetchingStudentArticle = async (id, access_token) => {
  try {
    const res = await axios.get(`/articles/user/${id}`, {
      headers: {
        token: `Beare ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const fetchingArticle = async (access_token) => {
  try {
    const res = await axios.get(`/articles`, {
      headers: {
        token: `Beare ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const fetchingFacultyArticle = async (access_token, fId) => {
  try {
    const res = await axios.get(`/articles/${fId}`, {
      headers: {
        token: `Beare ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export {
  login,
  getDetailsUSer,
  logout,
  fetchingStudentArticle,
  fetchingArticle,
  fetchingFacultyArticle,
};
