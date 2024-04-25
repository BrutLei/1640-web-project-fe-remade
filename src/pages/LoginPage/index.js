import React, { useEffect, useState } from "react";
import * as UserServices from "../../services/UserServices";
import useMutationHook from "../../hooks/useMutationHook";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);

  const mutaion = useMutationHook((data) => UserServices.login(data));
  const { data, isLoading, isSuccess, isError } = mutaion;

  const dispatch = useDispatch();

  // if (user.group === "student") {
  //   navigate("/student");
  // } else if (user.group === "admin") {
  //   navigate("/admin");
  // } else if (user.group === "Marketing Coordinator") {
  //   navigate("/marketingmanager");
  // }
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);

      if (decoded) {
        handleGetDetailsUser(decoded.id, token);
      }
      setLogged(!logged);
      if (user) {
        if (user.group === "student") {
          navigate("/student");
        } else if (user.group === "admin") {
          navigate("/admin");
        } else if (user.group === "Marketing Coordinator") {
          navigate("/marketingmanager");
        } else if (user.group === "Marketing Manager") {
          navigate("/manager");
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      if (data) {
        localStorage.setItem("access_token", data.DT.accessToken);
        const decoded = jwtDecode(data.DT.accessToken);

        if (decoded) {
          handleGetDetailsUser(decoded.id, data.DT.accessToken);
        }
      }
      if (data.EC === "0-1") {
        // navigate("/student");
        navigate("/marketingmanager");
      } else {
        navigate("/admin");
      }
    } else if (isError) {
      toast.error("Login falied");
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUSer(id, token);
    dispatch(updateUser({ ...res, access_token: token }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutaion.mutate({ email, password });
  };

  return (
    <section className="bg-gray-200 ">
      <div className=" w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    ></input>
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 ">Remember me</label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                disabled={!email.length || !password.length}
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
