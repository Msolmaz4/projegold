import { useContext } from "react";
import DataContext from "../../../context/data-context";

export function useDataContext() {
  return useContext(DataContext);
}
