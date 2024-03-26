import { Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import { routes } from "./routes";
import { Fragment } from "react";

function App() {
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
      </Routes>
    </>
  );
}

export default App;
