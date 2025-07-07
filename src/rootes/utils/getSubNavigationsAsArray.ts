import { AppRouteArray, AppRouteMap } from "types";

export function getSubNavigationsAsArray(
  routes: Record<string, AppRouteMap>,
  nested = false,
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
