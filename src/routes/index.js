import { StudentLayout } from "../layouts";
import { Home, Login, NotFoundPage } from "../pages";

export const routes = [
  {
    path: "/student",
    page: Home,
    layout: StudentLayout,
  },
  {
    path: "/login",
    page: Login,
    layout: null,
  },
  {
    path: "*",
    page: NotFoundPage,
    layout: null,
  },
];
