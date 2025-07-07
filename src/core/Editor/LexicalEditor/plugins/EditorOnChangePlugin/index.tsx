import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";

type LocalStoragePluginProps = {
  onChange: (editorState: EditorState) => void;
};

export const EditorOnChangePlugin: React.FC<LocalStoragePluginProps> = ({
  onChange,
}) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
};
