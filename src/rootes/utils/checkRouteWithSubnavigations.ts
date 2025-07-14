// src/rootes/utils/checkRouteWithSubnavigations.ts

import { matchPath } from "react-router-dom";
import type { AppRouteArray } from "../../types/Routes.types";

/**
 * Alt navigasyonlarda path eşleşmesi olup olmadığını kontrol eder
 */
export const checkRouteWithSubnavigations = (
  pathname: string,
  children: AppRouteArray[]
): boolean => {
  for (const child of children) {
    const match = matchPath({ path: child.path }, pathname);

    if (match) {
      return true;
    }

    // Recursive kontrol (alt route içinde de alt route varsa)
    if (child.children.length > 0) {
      const nestedMatch = checkRouteWithSubnavigations(
        pathname,
        child.children
      );
      if (nestedMatch) return true;
    }
  }

  return false;
};
