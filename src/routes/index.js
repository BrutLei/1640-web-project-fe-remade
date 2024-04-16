import { AdminLayout, StudentLayout } from "../layouts";
import {
  AcadamicYearPage,
  Admin,
  ArticlePage,
  DeadlinePage,
  FacultyPage,
  Login,
  HomePage,
  MarketingManagerPage,
  NotFoundPage,
  UserPage,
  ArticleTable,
} from "../pages";

export const routes = [
  {
    path: "/login",
    page: Login,
    layout: null,
  },
  {
    path: "/",
    page: HomePage,
    layout: null,
  },
  {
    path: "*",
    page: NotFoundPage,
    layout: null,
  },
];

export const marketerRoute = [
  {
    path: "/marketingmanager",
    page: MarketingManagerPage,
    layout: StudentLayout,
  },
];

export const studentRoutes = [
  {
    path: "/student",
    page: ArticlePage,
    layout: StudentLayout,
  },
];

export const adminRoutes = [
  {
    path: "/admin",
    page: Admin,
    layout: AdminLayout,
  },
  {
    path: "/admin/article",
    page: ArticleTable,
    layout: AdminLayout,
  },
  {
    path: "/admin/deadline",
    page: DeadlinePage,
    layout: AdminLayout,
  },
  {
    path: "/admin/faculty",
    page: FacultyPage,
    layout: AdminLayout,
  },
  {
    path: "/admin/user",
    page: UserPage,
    layout: AdminLayout,
  },
  {
    path: "/admin/year",
    page: AcadamicYearPage,
    layout: AdminLayout,
  },
];
