import { matchPath } from "react-router-dom";
import { AppRouteArray } from "types";

export const checkRouteWithSubnavigations = (
  pathname: string,
  routeArray: AppRouteArray[],
): boolean => {
  if (!routeArray.length) {
    return false;
  }
  for (const route of routeArray) {
    const isRoute = matchPath(
      {
        path: route.path,
      },
      pathname,
    );

    const isRouteSelected = Boolean(isRoute !== null && isRoute !== undefined);

    if (isRouteSelected) {
      return true;
    }

    if (route.children.length) {
      const isSubRouteSelected = checkRouteWithSubnavigations(
        pathname,
        route.children,
      );
      if (isSubRouteSelected) {
        return true;
      }
    }
  }
  return false;
};
