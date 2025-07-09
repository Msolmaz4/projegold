import { AuthRoutes } from "./AuthRoutes";

import Login from "../../auth/Login";

const AuthRouting = [
  {
    path: AuthRoutes.login,
    element: <Login />,
  },
];

export default AuthRouting;
