export const AuthRoutes = {
  login: "/login",
  logout: "/logout",
  verify: "/verify",
  resendVerify: "/resendverify",
  forgotPassword: "/forgotpassword",
  confirmForgotPassword: "/confirmForgotPassword",
  register: "/register",
};

export const isAuthRoute = (locationPathname: string) => {
  return Object.values(AuthRoutes).includes(locationPathname);
};
