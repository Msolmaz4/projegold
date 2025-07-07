import { ReactNode, createContext } from "react";
import { CellEditorConfig } from "./types";

type CellContextShape = {
  cellEditorConfig: null | CellEditorConfig;
  cellEditorPlugins: ReactNode;
  set: (
    cellEditorConfig: null | CellEditorConfig,
    cellEditorPlugins: ReactNode,
  ) => void;
};

const CellContext = createContext<CellContextShape>({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
});

export default CellContext;
