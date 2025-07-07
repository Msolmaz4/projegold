import { LexicalEditor, NodeKey } from "lexical";

export type Position = "left" | "right" | "full" | undefined;

export interface InlineImagePayload {
  altText: string;
  caption?: LexicalEditor;
  height?: number;
  key?: NodeKey;
  showCaption?: boolean;
  src: string;
  width?: number;
  position?: Position;
}
