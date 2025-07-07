import RoutesArray from "../RoutesArray";

export const getCurrentRoute = (pathname: string) => {
  for (const route of RoutesArray) {
    if (route.children.length) {
      for (const subRoute of route.children) {
        if (subRoute.children.length) {
          for (const subSubRoute of subRoute.children) {
            if (pathname.includes(subSubRoute.path)) {
              return subSubRoute;
            }
          }
        }
        if (pathname.includes(subRoute.path)) {
          return subRoute;
        }
      }
    }
    if (pathname.includes(route.path)) {
      return route;
    }
  }
};
