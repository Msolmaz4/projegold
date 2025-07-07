import ConfirmForgotPassword from "../../auth/ConfirmForgotPassword";
import ForgotPassword from "../../auth/ForgotPassword";
import Login from "../../auth/Login";
import { AuthRoutes } from "./AuthRoutes";

const AuthRouting = [
  {
    path: AuthRoutes.login,
    element: <Login />,
  },
  {
    path: AuthRoutes.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: AuthRoutes.confirmForgotPassword,
    element: <ConfirmForgotPassword />,
  },
];

export default AuthRouting;
