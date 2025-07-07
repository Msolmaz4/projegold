import { matchPath } from "react-router-dom";
import { AppRouteArray } from "types";
import { checkRouteWithSubnavigations } from "./checkRouteWithSubnavigations";

export const checkRouteIsSelected = (
  pathname: string,
  route: AppRouteArray,
) => {
  const routeMatch = matchPath(
    {
      path: route.path,
    },
    pathname,
  );

  const subRouteIsSelected = checkRouteWithSubnavigations(
    pathname,
    route.children,
  );

  const isRouteSelected = Boolean(
    routeMatch !== null && routeMatch !== undefined,
  );

  return isRouteSelected || subRouteIsSelected;
};
