/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { ReactNode } from "react";
import {
  COMMAND_PRIORITY_HIGH,
  DOMConversionMap,
  DOMConversionOutput,
  DecoratorNode,
  SerializedLexicalNode,
} from "lexical";
import PageBreakComponent from "./PageBreakComponent";
import { $createPageBreakNode } from "./createPageBreakNode";
import "./index.css";

type SerializedPageBreakNode = SerializedLexicalNode;

class PageBreakNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return "page-break";
  }

  static clone(node: PageBreakNode): PageBreakNode {
    return new PageBreakNode(node.__key);
  }

  static importJSON(pageBreakNode: SerializedPageBreakNode): PageBreakNode {
    console.log("pageBreakNode", pageBreakNode);
    return $createPageBreakNode();
  }

  static importDOM(): DOMConversionMap | null {
    return {
      figure: (domNode: HTMLElement) => {
        const tp = domNode.getAttribute("type");
        if (tp !== this.getType()) {
          return null;
        }

        return {
          conversion: $convertPageBreakElement,
          priority: COMMAND_PRIORITY_HIGH,
        };
      },
    };
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: this.getType(),
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    const el = document.createElement("figure");
    el.style.pageBreakAfter = "always";
    el.setAttribute("type", this.getType());
    return el;
  }

  getTextContent(): string {
    return "\n";
  }

  isInline(): false {
    return false;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): ReactNode {
    return <PageBreakComponent nodeKey={this.__key} />;
  }
}

function $convertPageBreakElement(): DOMConversionOutput {
  return { node: $createPageBreakNode() };
}

export default PageBreakNode;
