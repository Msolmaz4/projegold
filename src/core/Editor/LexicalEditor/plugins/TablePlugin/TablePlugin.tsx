import { ReactNode, useContext, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTableNodeWithDimensions, TableNode } from "@lexical/table";
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from "lexical";
import invariant from "../../shared/invariant";
import CellContext from "./CellContext";
import { INSERT_NEW_TABLE_COMMAND } from "./commands";
import { CellEditorConfig, InsertTableCommandPayload } from "./types";

function TablePlugin({
  cellEditorConfig,
  children,
}: {
  cellEditorConfig: CellEditorConfig;
  children: ReactNode;
}): ReactNode {
  const [editor] = useLexicalComposerContext();
  const cellContext = useContext(CellContext);

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      invariant(false, "TablePlugin: TableNode is not registered on editor");
    }

    cellContext.set(cellEditorConfig, children);

    return editor.registerCommand<InsertTableCommandPayload>(
      INSERT_NEW_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const tableNode = $createTableNodeWithDimensions(
          Number(rows),
          Number(columns),
          includeHeaders,
        );
        $insertNodes([tableNode]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [cellContext, cellEditorConfig, children, editor]);

  return null;
}

export default TablePlugin;
