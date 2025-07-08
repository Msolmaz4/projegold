import { ArrowLoginIcon, LogoutIcon, SpieleladenIcon } from "../icons";
import { NoRouteMatch } from "../layout/NoRouteMatch";
import { USER_GROUPS } from "../modules/usermanagement/roles/api";
import ConfirmForgotPassword from "../auth/ConfirmForgotPassword";
import ForgotPassword from "../auth/ForgotPassword";
import Login from "../auth/Login";
import { AuthRoutes } from "./auth";
import Logout from "../auth/Logout";
import MainLayout from "../components/MainLayout";

const AppRoutes = {
  start: {
    key: "start",
    path: "/",
    section: "general",
    title: "mainlayout",
    element: <MainLayout />,
    icon: <SpieleladenIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },

  logout: {
    key: "logout",
    path: "/logout",
    section: "account",
    title: "Ausloggen",
    element: <Logout />,
    icon: <LogoutIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: true,
    indented: false,
    isWithParam: false,
    children: {},
  },
  login: {
    key: "login",
    path: AuthRoutes.login,
    section: "account",
    title: "Einloggen",
    element: <Login />,
    icon: <ArrowLoginIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },
  forgotPassword: {
    key: "forgotPassword",
    path: AuthRoutes.forgotPassword,
    section: "account",
    title: "Passwort vergessen",
    element: <ForgotPassword />,
    icon: <ArrowLoginIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },
  confirmForgotPassword: {
    key: "confirmForgotPassword",
    path: AuthRoutes.confirmForgotPassword,
    section: "account",
    title: "Passwort vergessen bestätigen",
    element: <ConfirmForgotPassword />,
    icon: <ArrowLoginIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },

  noRouteMatch: {
    key: "noRouteMatch",
    path: "*",
    section: "general",
    title: "Keine Route gefunden",
    element: <NoRouteMatch />,
    icon: <LogoutIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },
};

export default AppRoutes;
