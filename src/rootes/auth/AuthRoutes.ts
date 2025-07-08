export const AuthRoutes = {
  login: "/",
};

export const isAuthRoute = (locationPathname: string) => {
  return Object.values(AuthRoutes).includes(locationPathname);
};
