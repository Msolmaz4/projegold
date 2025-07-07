export const getRouteParamName = (pathname: string) => {
  const pathParts = pathname.split("/");

  return pathParts[pathParts.length - 1];
};
