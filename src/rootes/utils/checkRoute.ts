import { matchPath } from "react-router-dom";
//import { AppRoute } from "types";
import { ReactNode } from "react";

export type AppRouteSection = "general" | "account" | "admin" | "verwaltung";

export interface AppRoute {
  key: string;
  path: string;
  section: AppRouteSection | (string & {});
  title: string;
  element: ReactNode;
  icon: ReactNode;
  groups: string[];
  level: number;
  navigation: boolean;
  indented: boolean;
  isWithParam: boolean;
}

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
