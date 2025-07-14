// src/rootes/utils/checkRouteIsSelected.ts

import { matchPath } from "react-router-dom";
import { checkRouteWithSubnavigations } from "./checkRouteWithSubnavigations";
import type { AppRouteArray } from "../../types/Routes.types";

/**
 * Belirli bir route'un veya alt route'lardan birinin aktif olup olmadığını kontrol eder
 */
export const checkRouteIsSelected = (
  pathname: string,
  route: AppRouteArray
): boolean => {
  // Mevcut route için eşleşme kontrolü
  const routeMatch = matchPath({ path: route.path }, pathname);

  // Alt route'lar için kontrol
  const subRouteIsSelected = checkRouteWithSubnavigations(
    pathname,
    route.children
  );

  // Route ya da alt route seçiliyse true döner
  return Boolean(routeMatch) || subRouteIsSelected;
};
