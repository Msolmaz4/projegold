/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { RefObject, SetStateAction } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalEditor } from "lexical";
import { CustomFormLabelProps, FieldHandles } from "types";
import LexicalEditorComponent from "./LexicalEditorComponent";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";

interface LexicalEditorComposerProps extends CustomFormLabelProps {
  className?: string;
  maxWidth?: number;
  required?: boolean;
  showDetailFirst?: boolean;
  setEditor?: (value: SetStateAction<LexicalEditor>) => void;
  onChange?: (editor: LexicalEditor) => void;
  initialValue?: string | null | undefined;
  placeholder: string;
  editorRef?: RefObject<FieldHandles | null>;
}

const LexicalEditorComposer: React.FC<LexicalEditorComposerProps> = ({
  setEditor,
  onChange,
  initialValue,
  placeholder,
  showDetailFirst,
  editorRef,
  ...rest
}) => {
  const initialConfig = {
    editorState: undefined,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalEditorComponent
        onChange={(editor: LexicalEditor) => {
          if (setEditor) setEditor(editor);
          if (onChange) onChange(editor);
        }}
        initialValue={initialValue}
        placeholder={placeholder}
        showDetailFirst={showDetailFirst}
        ref={editorRef}
        {...rest}
      />
    </LexicalComposer>
  );
};

export default LexicalEditorComposer;
