/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { HashtagNode } from "@lexical/hashtag";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { OverflowNode } from "@lexical/overflow";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import type { Klass, LexicalNode } from "lexical";
import { ImageNode } from "./Image";
import { InlineImageNode } from "./InlineImageNode";
import { PageBreakNode } from "./PageBreakNode";
import { YouTubeNode } from "./YouTube";

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  AutoLinkNode,
  HashtagNode,
  HeadingNode,
  HorizontalRuleNode,
  HorizontalRuleNode,
  ImageNode,
  InlineImageNode,
  LinkNode,
  ListItemNode,
  ListNode,
  MarkNode,
  MarkNode,
  OverflowNode,
  PageBreakNode,
  QuoteNode,
  TableCellNode,
  TableNode,
  TableRowNode,
  YouTubeNode,
];

export default PlaygroundNodes;
