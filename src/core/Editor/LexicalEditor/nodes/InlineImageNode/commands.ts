import { LexicalCommand, createCommand } from "lexical";
import { InlineImagePayload } from "./types";

export const INSERT_INLINE_IMAGE_COMMAND: LexicalCommand<InlineImagePayload> =
  createCommand("INSERT_INLINE_IMAGE_COMMAND");
