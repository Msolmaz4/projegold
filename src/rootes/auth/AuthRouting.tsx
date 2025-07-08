//import Login from "../../auth/Login";
//import { AuthRoutes } from "./AuthRoutes";

//const AuthRouting = [
//{
// path: AuthRoutes.login,
//  element: <Login />,
// },
//];

//export default AuthRouting;

import { AuthRoutes } from "./AuthRoutes";

// Eğer dosya `auth/Login.tsx` ise:

import Login from "../../auth/Login";

// Eğer dosya `auth/Login/index.tsx` ise:
// const Login = lazy(() => import("../auth/Login/index"));

const AuthRouting = [
  {
    path: AuthRoutes.login,
    element: <Login />,
  },
];

export default AuthRouting;
