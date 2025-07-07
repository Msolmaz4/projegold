import { $applyNodeReplacement } from "lexical";
import InlineImageNode from "./InlineImageNode";
import { InlineImagePayload } from "./types";

export function $createInlineImageNode({
  altText,
  position,
  height,
  src,
  width,
  showCaption,
  caption,
  key,
}: InlineImagePayload): InlineImageNode {
  return $applyNodeReplacement(
    new InlineImageNode(
      src,
      altText,
      position,
      width,
      height,
      showCaption,
      caption,
      key,
    ),
  );
}
