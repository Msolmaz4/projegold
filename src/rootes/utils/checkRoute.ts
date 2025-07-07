import { matchPath } from "react-router-dom";
import { AppRoute } from "types";

export const checkRoute = (pathname: string, route: AppRoute) => {
  const isRoute = matchPath(
    {
      path: route.path,
    },
    pathname,
  );

  const isCurrentRoute =
    Boolean(isRoute !== null && isRoute !== undefined) &&
    route.key !== "noRouteMatch";

  return isCurrentRoute;
};
