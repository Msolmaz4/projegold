// src/rootes/utils/getSubNavigationsAsArray.ts

import type { AppRouteMap, AppRouteArray } from "../../types/Routes.types";

/**
 * AppRouteMap objesini AppRouteArray dizisine dönüştürür.
 * nested = true ise alt route'lar iç içe yerleştirilir, false ise düz bir liste döner.
 */
export function getSubNavigationsAsArray(
  routes: Record<string, AppRouteMap>,
  nested = false
): AppRouteArray[] {
  return Object.values(routes).flatMap((route) => {
    // Element veya path eksikse, alt çocuklara geç
    if (!route.path || !route.element) {
      return route.children && Object.keys(route.children).length > 0
        ? getSubNavigationsAsArray(route.children, nested)
        : [];
    }

    // Temel route oluşturuluyor
    const baseRoute: AppRouteArray = {
      ...route,
      children: [],
    };

    const hasChildren =
      route.children && Object.keys(route.children).length > 0;

    if (hasChildren) {
      const childArray = getSubNavigationsAsArray(route.children, nested);

      return nested
        ? [
            {
              ...baseRoute,
              children: childArray,
            },
          ]
        : [baseRoute, ...childArray];
    }

    return [baseRoute];
  });
}
