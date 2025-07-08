import { useContext } from "react";
import LayoutContext from "../../../context/layout-context";

export function useLayoutContext() {
  return useContext(LayoutContext);
}
