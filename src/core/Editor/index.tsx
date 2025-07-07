/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { RefObject, SetStateAction } from "react";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalEditor } from "lexical";
import { CustomFormLabelProps, FieldHandles } from "types";
import LexicalEditorComposer from "./LexicalEditor/LexicalEditorComposer";

interface EditorProps extends CustomFormLabelProps {
  setEditor?: (value: SetStateAction<LexicalEditor>) => void;
  onChange?: (editor: LexicalEditor) => void;
  initialValue?: string | null | undefined;
  placeholder?: string;
  className?: string;
  maxWidth?: number;
  required?: boolean;
  showDetailFirst?: boolean;
  editorRef?: RefObject<FieldHandles | null>;
}

const Editor: React.FC<EditorProps> = ({
  setEditor,
  onChange,
  initialValue,
  placeholder = "Text eingeben...",
  className,
  maxWidth,
  required,
  showDetailFirst,
  editorRef,
  ...rest
}) => (
  <LexicalEditorComposer
    setEditor={setEditor}
    onChange={onChange}
    initialValue={initialValue}
    placeholder={placeholder}
    className={className}
    maxWidth={maxWidth}
    required={required}
    showDetailFirst={showDetailFirst}
    editorRef={editorRef}
    {...rest}
  />
);

export default Editor;
