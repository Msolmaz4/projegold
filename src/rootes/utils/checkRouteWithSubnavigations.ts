import { matchPath } from "react-router-dom";
//import { AppRouteArray } from "types";
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

export const checkRouteWithSubnavigations = (
  pathname: string,
  routeArray: AppRouteArray[]
): boolean => {
  if (!routeArray.length) {
    return false;
  }
  for (const route of routeArray) {
    const isRoute = matchPath(
      {
        path: route.path,
      },
      pathname
    );

    const isRouteSelected = Boolean(isRoute !== null && isRoute !== undefined);

    if (isRouteSelected) {
      return true;
    }

    if (route.children.length) {
      const isSubRouteSelected = checkRouteWithSubnavigations(
        pathname,
        route.children
      );
      if (isSubRouteSelected) {
        return true;
      }
    }
  }
  return false;
};
