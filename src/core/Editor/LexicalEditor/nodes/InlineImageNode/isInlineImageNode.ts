import { LexicalNode } from "lexical";
import InlineImageNode from "./InlineImageNode";

export function $isInlineImageNode(
  node: LexicalNode | null | undefined,
): node is InlineImageNode {
  return node instanceof InlineImageNode;
}
