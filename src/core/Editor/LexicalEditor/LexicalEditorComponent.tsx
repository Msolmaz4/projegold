/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FormControl, IconButton } from "@mui/material";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CharacterLimitPlugin } from "@lexical/react/LexicalCharacterLimitPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import useLexicalEditable from "@lexical/react/useLexicalEditable";
import { PenEditIcon } from "icons";
import { LexicalEditor } from "lexical";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles } from "types";
import { DescriptionFormatter } from "components";
import CustomFormLabel from "../../CustomFormLabel";
import TableCellNodes from "./nodes/TableCellNodes";
import ActionsPlugin from "./plugins/ActionsPlugin";
import { AutoEmbedPlugin } from "./plugins/AutoEmbedPlugin";
import DragDropPaste from "./plugins/DragDropPastePlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import { ImagesPlugin } from "./plugins/ImagesPlugin";
import { InlineImagePlugin } from "./plugins/InlineImagePlugin";
import LexicalDefaultValuePlugin from "./plugins/LexicalDefaultValuePlugin";
import LinkPlugin from "./plugins/LinkPlugin";
// import { PageBreakPlugin } from "./plugins/PageBreakPlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import TableCellResizer from "./plugins/TableCellResizer";
import { TablePlugin as NewTablePlugin } from "./plugins/TablePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import { CAN_USE_DOM } from "./shared/canUseDOM";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import ContentEditable from "./ui/ContentEditable";
import utils from "utils";
import useStyles from "./styles";

interface LexicalEditorProps extends CustomFormLabelProps {
  className?: string;
  maxWidth?: number;
  required?: boolean;
  showDetailFirst?: boolean;
  onChange: (editor: LexicalEditor) => void;
  initialValue: string | null | undefined;
  placeholder: string;
}

const LexicalEditorComponent: ForwardRefRenderFunction<
  FieldHandles,
  LexicalEditorProps
> = (
  {
    className,
    maxWidth,
    required = false,
    showDetailFirst = true,
    onChange,
    initialValue,
    placeholder,

    // CustomFormLabelProps
    info,
    infoContent,
    infoTitle,
    label,
    description,
    id = nanoid(5),
    showRequiredSymbol,
    nodeBefore,
  },
  lexicalEditorRef,
) => {
  const { classes, cx } = useStyles();

  const isCharLimit = true;
  const maxCharLimit = 5000;

  const [editor] = useLexicalComposerContext();
  const isEditable = useLexicalEditable();

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const [showDetail, setShowDetail] = useState<boolean>(showDetailFirst);

  useImperativeHandle(lexicalEditorRef, () => ({
    highlight: (scroll = true) => {
      console.log("highlighting...");
      setInputStatus("error");
      if (scroll) {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -150,
          duration: 700,
        });
      }
      editor.focus();
    },
  }));

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const cellEditorConfig = {
    namespace: "Playground",
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <FormControl
      style={{ maxWidth: maxWidth ? maxWidth : "unset" }}
      classes={{
        root: cx(
          className || classes.formControlRoot,
          inputStatus === "error" ? classes.inputError : null,
          inputStatus === "success" ? classes.inputSuccess : null,
        ),
      }}
    >
      <CustomFormLabel
        info={info}
        infoContent={infoContent}
        infoTitle={infoTitle}
        label={label}
        description={description}
        id={id}
        showRequiredSymbol={required && showRequiredSymbol}
        nodeBefore={nodeBefore}
        nodeAfter={
          showDetail && (
            <IconButton
              onClick={() => setShowDetail(false)}
              className={classes.editButton}
            >
              <PenEditIcon className={classes.editIcon} />
            </IconButton>
          )
        }
        errorLabel={inputStatus === "error"}
      />

      {showDetail ? (
        <DescriptionFormatter
          description={utils.wysiwyg.getStringFromEditorState(editor)}
        />
      ) : (
        <div className={`editor-shell editor-${inputStatus}`} id={id}>
          <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
          <div className={`editor-container`}>
            <OnChangePlugin onChange={(_, editor) => onChange(editor)} />
            <LexicalDefaultValuePlugin initialValue={initialValue} />

            {/* Official Plugins */}
            <DragDropPaste />
            <AutoFocusPlugin />
            <ClearEditorPlugin />
            <HashtagPlugin />
            <AutoEmbedPlugin />

            <HistoryPlugin />
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor testeditor" ref={onRef}>
                    <ContentEditable placeholder={placeholder} />
                  </div>
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ListPlugin />
            <CheckListPlugin />

            {/* <PageBreakPlugin /> */}

            <TablePlugin hasCellMerge={true} hasCellBackgroundColor={true} />
            <TableCellResizer />
            <NewTablePlugin cellEditorConfig={cellEditorConfig}>
              <AutoFocusPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    placeholder={placeholder}
                    className="TableNode__contentEditable"
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <InlineImagePlugin />
              <ImagesPlugin captionsEnabled={false} />
              <LinkPlugin />
              <LexicalClickableLinkPlugin />
              <FloatingTextFormatToolbarPlugin
                setIsLinkEditMode={setIsLinkEditMode}
              />
            </NewTablePlugin>

            <InlineImagePlugin />
            <ImagesPlugin />
            <LinkPlugin />
            <YouTubePlugin />

            {!isEditable && <LexicalClickableLinkPlugin />}

            <HorizontalRulePlugin />
            <TabFocusPlugin />
            <TabIndentationPlugin />

            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
                <TableCellActionMenuPlugin
                  anchorElem={floatingAnchorElem}
                  cellMerge={true}
                />
                <FloatingTextFormatToolbarPlugin
                  anchorElem={floatingAnchorElem}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
              </>
            )}

            {isCharLimit && (
              <CharacterLimitPlugin charset="UTF-16" maxLength={maxCharLimit} />
            )}

            <ActionsPlugin />
          </div>
        </div>
      )}
    </FormControl>
  );
};

export default forwardRef(LexicalEditorComponent);
