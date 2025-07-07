/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { ReactNode } from "react";
import { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { validateUrl } from "../../utils/url";

export default function LinkPlugin(): ReactNode {
  return <LexicalLinkPlugin validateUrl={validateUrl} />;
}
