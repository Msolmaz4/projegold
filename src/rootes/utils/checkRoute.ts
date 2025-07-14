import { matchPath } from "react-router-dom";
import type { AppRoute } from "../../types/Routes.types";
export type AppRouteSection = "general" | "account" | "admin" | "verwaltung";

export interface AppRouteMap extends AppRoute {
  children: Record<string, AppRouteMap>;
}

export interface AppRouteArray extends AppRoute {
  children: AppRouteArray[];
}
export const checkRoute = (pathname: string, route: AppRoute) => {
  const isRoute = matchPath(
    {
      path: route.path,
    },
    pathname
  );

  const isCurrentRoute =
    Boolean(isRoute !== null && isRoute !== undefined) &&
    route.key !== "noRouteMatch";

  return isCurrentRoute;
};
