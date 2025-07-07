import { LexicalNode } from "lexical";
import YouTubeNode from "./YouTubeNode";

export function $isYouTubeNode(
  node: YouTubeNode | LexicalNode | null | undefined,
): node is YouTubeNode {
  return node instanceof YouTubeNode;
}
