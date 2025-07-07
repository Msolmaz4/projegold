import { getRouteParams } from "./getRouteParams";

export const getRouteLastParamName = (pathname: string) => {
  const routeParams = getRouteParams(pathname);

  return routeParams.length ? routeParams[routeParams.length - 1] : null;
};
