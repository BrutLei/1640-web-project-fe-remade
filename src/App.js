import { Route, Routes, useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { adminRoutes, marketerRoute, routes, studentRoutes } from "./routes";
import * as UserServices from "./services/UserServices";
import { updateUser } from "./redux/slices/userSlice";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { decode, token } = handleDecoded();
    if (decode?.id) {
      handleGetDetailsUser(decode.id, token);
    }
  }, []);

  // handle decoded
  const handleDecoded = () => {
    let token = user.access_token || localStorage.getItem("access_token");
    let decode = {};
    if (token) {
      decode = jwtDecode(token);
      if (decode && decode.id) {
        // console.log(decode);
        return { decode, token };
      }
    }
    return { decode, token };
  };

  // Get details user
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUSer(id, token);

    dispatch(updateUser({ ...res, access_token: token }));
  };

  return (
    <>
      <Routes>
        {routes.map((e, index) => {
          const Page = e.page;
          const Layout = e.layout ? e.layout : Fragment;
          return (
            <Route
              key={index}
              path={e.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {user.group == "student" &&
          studentRoutes.map((e, index) => {
            const Page = e.page;
            const Layout = e.layout ? e.layout : Fragment;
            return (
              <Route
                key={index}
                path={e.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        {user.group == "admin" &&
          adminRoutes.map((e, index) => {
            const Page = e.page;
            const Layout = e.layout ? e.layout : Fragment;
            return (
              <Route
                key={index}
                path={e.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        {user.group == "Marketing Coordinator" &&
          marketerRoute.map((e, index) => {
            const Page = e.page;
            const Layout = e.layout ? e.layout : Fragment;
            return (
              <Route
                key={index}
                path={e.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
