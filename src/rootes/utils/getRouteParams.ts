export const getRouteParams = (pathname: string) => {
  const pathParts = pathname.split("/");
  const params = pathParts.filter((pathPart) => pathPart.charAt(0) === ":");
  return params;
};
