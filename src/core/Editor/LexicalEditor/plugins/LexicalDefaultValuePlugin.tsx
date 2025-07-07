import { useEffect } from "react";
import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
} from "lexical";

export default function LexicalDefaultValuePlugin({
  initialValue = "",
}: {
  initialValue?: string | null;
}) {
  const [editor] = useLexicalComposerContext();

  const updateHTML = (editor: LexicalEditor, value: string) => {
    const root = $getRoot();
    root.clear();

    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);

    // Check if value ws empty or text node
    if (!nodes.length || nodes[0].getType() === "text") {
      const p = $createParagraphNode();
      p.append($createTextNode(value));
      root.append(p);
    } else {
      root.append(...nodes);
    }
  };

  useEffect(() => {
    if (editor && initialValue && initialValue !== "") {
      editor.update(() => {
        updateHTML(editor, initialValue);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  return null;
}
