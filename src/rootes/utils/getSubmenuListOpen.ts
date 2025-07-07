import RoutesArray from "../RoutesArray";

export const getSubmenuListOpen = (pathname: string): string[] => {
  const submenuListOpen: string[] = RoutesArray.filter((route) =>
    route!.children
      ?.filter((subRoute) => subRoute.navigation)
      .some((subRoute) => pathname.includes(subRoute.path)),
  ).map((route) => route.key);

  return submenuListOpen;
};
