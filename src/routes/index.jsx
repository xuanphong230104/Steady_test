import { lazy } from "react";
import { PATH } from "../constants";

const Home = lazy(() => import("../pages/Home"));
const History = lazy(() => import("../pages/History"));
const TestScript = lazy(() => import("../pages/TestScript"));
const TestScriptDetail = lazy(
  () => import("../pages/TestScript/TestScriptDetail"),
);
const TestScriptUpdate = lazy(
  () => import("../pages/TestScript/TestScriptUpdate"),
);
const TestScriptCreate = lazy(
  () => import("../pages/TestScript/TestScriptCreate"),
);
const Login = lazy(() => import("../pages/Login"));
const Users = lazy(() => import("../pages/Users"));
const UserCreate = lazy(() => import("../pages/Users/UserCreate"));
const UserUpdate = lazy(() => import("../pages/Users/UserUpdate"));
const UserDetail = lazy(() => import("../pages/Users/UserDetail"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const routes = [
  {
    path: PATH.home,
    element: <Home />,
    defaultLayout: true,
    private: true,
  },
  {
    path: PATH.history,
    element: <History />,
    defaultLayout: true,
    private: true,
  },
  {
    path: PATH.users,
    element: <Users />,
    defaultLayout: true,
    private: true,
  },
  {
    path: `${PATH.users}/:id`,
    element: <UserDetail />,
    defaultLayout: true,
    private: true,
  },
  {
    path: `${PATH.users}/:id/update`,
    element: <UserUpdate />,
    defaultLayout: true,
    private: true,
  },
  {
    path: `${PATH.users}/create`,
    element: <UserCreate />,
    defaultLayout: true,
    private: true,
  },
  {
    path: PATH.testScript,
    element: <TestScript />,
    defaultLayout: true,
    private: true,
  },
  {
    path: `${PATH.testScript}/:id`,
    element: <TestScriptDetail />,
    defaultLayout: true,
    private: true,
  },
  {
    path: `${PATH.testScript}/:id/update`,
    element: <TestScriptUpdate />,
    defaultLayout: true,
    private: true,
  },
  {
    path: `${PATH.testScript}/create`,
    element: <TestScriptCreate />,
    defaultLayout: true,
    private: true,
  },
  {
    path: PATH.login,
    element: <Login />,
    private: false,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
