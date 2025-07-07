import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useLayoutContext } from "hooks";
import { AttachmentAddIcon, CloseIcon, DoneIcon } from "icons";
import { useDropzone } from "react-dropzone";
import { scroller } from "react-scroll";
import { FieldHandles, S3Resource } from "types";
import { v4 as uuidv4 } from "uuid";
import { DocumentIcon } from "components";
import { Loading } from "..";
import utils from "utils";
import useStyles from "./styles";

const MAX_SIZE_BYTES = 31457280; // 30MB

interface UploadAttachmentsProps {
  attachments: S3Resource[];
  setAttachments: React.Dispatch<React.SetStateAction<S3Resource[]>>;
  maxFiles?: number;
  maxSize?: number;
  uploading: boolean;
  uploadProgress: number;
}

const UploadAttachmentsComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  UploadAttachmentsProps
> = (
  {
    attachments,
    setAttachments,
    maxFiles = 20,
    maxSize = 10000000, // 10MB
    uploading,
    uploadProgress,
  },
  uploadDropZoneRef,
) => {
  const { classes, cx } = useStyles();
  const { notify } = useLayoutContext();

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const id = uuidv4();

  useImperativeHandle(uploadDropZoneRef, () => ({
    highlight: (scroll = true) => {
      setInputStatus("error");
      if (scroll) {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -50,
          duration: 700,
        });
      }
    },
  }));

  const { getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const currentFilesSize = useMemo(() => {
    return attachments.reduce((acc, attachment) => {
      return acc + attachment.size;
    }, 0);
  }, [attachments]);

  useEffect(() => {
    console.log("acceptedFiles: ", acceptedFiles);
    let newAttachments = acceptedFiles.map((file) => {
      const fileNameExtensionSplitted = file.name.split(".");
      const extension =
        fileNameExtensionSplitted[
          fileNameExtensionSplitted.length - 1
        ].toLowerCase();

      return Object.assign(file, {
        __typename: "S3Resource" as const,
        preview: URL.createObjectURL(file),
        extension: extension,
        safeSearchRequestSuccess: false,
        isSafeSearch: false,
        uploadStatus: false,
        processing: false,
        uploading: false,
        s3ResourceID: file.name + " - " + uuidv4(),
        fromDatabase: false,
        bucket: "",
        region: "",
        key: file.name,
      });
    });

    let newAttachmentsSize = 0;

    console.log("currentFilesSize: ", currentFilesSize);

    newAttachments = newAttachments.filter((newAttachment) => {
      if (newAttachment.size > maxSize) {
        notify("Es dürfen nur Dateien bis zu 9MB hochgeladen werden!");
        return false;
      } else if (
        currentFilesSize + newAttachmentsSize + newAttachment.size >
        MAX_SIZE_BYTES
      ) {
        notify("Es dürfen nur Dateien bis zu 9MB hochgeladen werden!");
        return false;
      } else {
        newAttachmentsSize += newAttachment.size;
        return true;
      }
    });

    console.log("newAttachments: ", newAttachments);

    setAttachments((prevState) => {
      if (prevState.length + newAttachments.length > maxFiles) {
        const allowedAttachments = newAttachments.slice(
          0,
          maxFiles - prevState.length,
        );
        notify("Nur eine bestimmte Anzahl von Dateien erlaubt: " + maxFiles);

        return [...prevState, ...allowedAttachments];
      } else {
        return [...prevState, ...newAttachments];
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles, maxSize, maxFiles]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      attachments.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [attachments],
  );

  return (
    <section className={classes.attachmentsWrapper}>
      <aside className={classes.thumbsContainer}>
        {attachments.map((attachment) => {
          console.log(
            "Calling getDocumentIconType with attachment: ",
            attachment,
            " and attachment.type: ",
            attachment.type,
          );

          const documentIconType = utils.s3resources.getDocumentIconType(
            attachment.type,
          );

          console.log("documentIconType is: ", documentIconType);

          return (
            <div className={classes.thumbWrapper} key={attachment.s3ResourceID}>
              <div className={classes.thumb}>
                <div className={classes.thumbInner}>
                  <div className={classes.attachmentIconWrapper}>
                    {documentIconType === "image" ? (
                      <img
                        alt={""}
                        src={attachment.preview}
                        className={classes.img}
                      />
                    ) : (
                      <DocumentIcon fileType={attachment.type} />
                    )}
                  </div>
                  <Typography className={classes.attachmentName}>
                    {attachment.key}
                  </Typography>
                  <div className={classes.iconWrapper}>
                    <IconButton
                      size="small"
                      className={classes.removeAttachment}
                      onClick={() => {
                        setAttachments((prevAttachments) =>
                          prevAttachments.filter(
                            (prevAttachment) =>
                              prevAttachment.s3ResourceID !==
                              attachment.s3ResourceID,
                          ),
                        );
                      }}
                    >
                      <CloseIcon className={classes.removeIcon} />
                    </IconButton>

                    {attachment.uploadStatus ? (
                      <DoneIcon className={classes.doneIcon} />
                    ) : attachment.uploading ? (
                      <CircularProgress
                        variant="determinate"
                        size="25px"
                        className={classes.uploadingIcon}
                        value={uploadProgress}
                      />
                    ) : attachment.processing ? (
                      <Loading className={classes.processingIcon} size="25px" />
                    ) : (
                      <IconButton
                        size="small"
                        className={classes.removeAttachment}
                        onClick={() => {
                          setAttachments((prevAttachments) =>
                            prevAttachments.filter(
                              (prevAttachment) =>
                                prevAttachment.s3ResourceID !==
                                attachment.s3ResourceID,
                            ),
                          );
                        }}
                        disabled={uploading}
                      >
                        <CloseIcon className={classes.removeIcon} />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <input {...getInputProps()} id={id} />
      </aside>
      <div className={classes.buttonWrapper}>
        <Button
          className={cx(
            classes.button,
            inputStatus === "error" && classes.buttonError,
          )}
          onClick={() => open()}
          focusVisibleClassName={classes.focusVisible}
          id={id}
          disabled={uploading}
        >
          <AttachmentAddIcon className={classes.attachmentButtonIcon} />
          <Typography className={classes.buttonText}>Anhängen</Typography>
        </Button>
      </div>
    </section>
  );
};

export default React.forwardRef(UploadAttachmentsComponent);
