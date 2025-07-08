//import { AppRouteArray, AppRouteMap } from "types";

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

export function getSubNavigationsAsArray(
  routes: Record<string, AppRouteMap>,
  nested = false
): AppRouteArray[] {
  return Object.values(routes).flatMap((route) => {
    if (!route.path || !route.element) {
      return route.children && Object.keys(route.children).length > 0
        ? getSubNavigationsAsArray(route.children, nested)
        : [];
    }

    const baseRoute: AppRouteArray = {
      ...route,
      path: route.path,
      element: route.element,
      children: [],
    };

    return route.children && Object.keys(route.children).length > 0
      ? nested
        ? [
            {
              ...baseRoute,
              children: getSubNavigationsAsArray(route.children, nested),
            },
          ]
        : [baseRoute, ...getSubNavigationsAsArray(route.children, nested)]
      : [baseRoute];
  });
}
