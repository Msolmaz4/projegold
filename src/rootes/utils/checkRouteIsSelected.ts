import { matchPath } from "react-router-dom";
import type { ReactNode } from "react";
import { checkRouteWithSubnavigations } from "./checkRouteWithSubnavigations";

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

export const checkRouteIsSelected = (
  pathname: string,
  route: AppRouteArray
) => {
  const routeMatch = matchPath(
    {
      path: route.path,
    },
    pathname
  );

  const subRouteIsSelected = checkRouteWithSubnavigations(
    pathname,
    route.children
  );

  const isRouteSelected = Boolean(
    routeMatch !== null && routeMatch !== undefined
  );

  return isRouteSelected || subRouteIsSelected;
};
