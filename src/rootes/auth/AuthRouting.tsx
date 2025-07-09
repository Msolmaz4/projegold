import ConfirmForgotPassword from "../../auth/ConfirmForgotPassword";
import ForgotPassword from "../../auth/ForgotPassword";
import Login from "../../auth/Login";
import RegisterPage from "../../auth/Register";
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
  {
    path: AuthRoutes.register,
    element: <RegisterPage />,
  },
];

export default AuthRouting;
