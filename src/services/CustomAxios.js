import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

const handleDecoded = () => {
  let token = localStorage.getItem("access_token");
  if (token) {
    const decode = jwtDecode(token);
    if (decode && decode.id) {
      return { decode, token };
    }
  }
};

instance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    console.log(">>>Error Check: ", error.name);
    console.log(">>>Error message: ", error.response);
    let res = {};
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    // return Promise.reject(error);
    return res;
  }
);
export default instance;
