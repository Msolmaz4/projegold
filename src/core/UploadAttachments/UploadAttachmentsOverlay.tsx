import React, { useCallback, useEffect, useMemo } from "react";
import { useLayoutContext } from "hooks";
import { AttachmentAddIcon } from "icons";
import { useDropzone } from "react-dropzone";
import { S3Resource } from "types";
import { v4 as uuidv4 } from "uuid";
import useStyles from "./styles";

const MAX_SIZE_BYTES = 31457280; // 30MB

interface UploadAttachmentsOverlayProps {
  attachments: S3Resource[];
  setAttachments: React.Dispatch<React.SetStateAction<S3Resource[]>>;
  maxFiles?: number;
  maxSize?: number;
  uploading: boolean;
  children: React.ReactNode;
}

const UploadAttachmentsOverlay: React.FC<UploadAttachmentsOverlayProps> = ({
  attachments,
  setAttachments,
  maxFiles = 20,
  maxSize = 10000000, // 10MB
  uploading,
  children,
}) => {
  const { classes, cx } = useStyles();
  const { notify } = useLayoutContext();

  const id = uuidv4();

  const currentFilesSize = useMemo(() => {
    return attachments.reduce((acc, attachment) => {
      return acc + attachment.size;
    }, 0);
  }, [attachments]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
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
          notify("Es dürfen nur Dateien bis zu 10MB hochgeladen werden!");
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxSize, maxFiles],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      attachments.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [attachments],
  );

  return (
    <div className={classes.dropZoneContainer}>
      {attachments.length < maxFiles && !uploading ? (
        <div
          {...getRootProps({
            className: cx(
              classes.baseStyle,
              isDragActive ? classes.activeStyle : {},
              isDragAccept ? classes.acceptStyle : {},
              isDragReject ? classes.rejectStyle : {},
            ),
          })}
        >
          <input {...getInputProps({ className: classes.dropZone })} id={id} />
          {isDragActive && (
            <div className={classes.attachmentOverlay}>
              <AttachmentAddIcon className={classes.attachmentIcon} />
              Dateien anfügen
            </div>
          )}
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default UploadAttachmentsOverlay;
