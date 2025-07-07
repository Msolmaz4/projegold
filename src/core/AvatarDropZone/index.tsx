import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useAuthContext, useLayoutContext } from "hooks";
import { nanoid } from "nanoid";
import { useDropzone } from "react-dropzone";
import { S3Resource } from "types";
import Loading from "../Loading";
import utils from "utils";
import useStyles from "./styles";

type AvatarDropZoneProps = {
  dragActiveText: string;
  dragInactiveText: string;
  avatar: S3Resource | null;
  setAvatar: (value: React.SetStateAction<S3Resource | null>) => void;
  maxSize: number;
  uploading: boolean;
  uploadProgress?: number;
};

const AvatarDropZone: React.FC<AvatarDropZoneProps> = ({
  dragActiveText,
  dragInactiveText,
  avatar,
  setAvatar,
  maxSize,
  uploading,
  uploadProgress,
}) => {
  const { classes, cx } = useStyles();
  const authContext = useAuthContext();
  const { notify } = useLayoutContext();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, [uploadProgress]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setLoading(true);
        utils.logger.info("acceptedFiles: ", acceptedFiles);
        const newImages = acceptedFiles.map((file) => {
          const extension = file.type.split("/")[1].toLowerCase();

          return Object.assign(file, {
            __typename: "S3Resource" as const,
            preview: URL.createObjectURL(file),
            extension: extension,
            safeSearchRequestSuccess: false,
            isSafeSearch: false,
            uploadStatus: false,
            processing: false,
            uploading: false,
            s3ResourceID: nanoid(),
            fromDatabase: false,
            bucket: "",
            region: "",
            key: "",
          });
        });
        const imageFile = newImages[0];
        console.log("imageFile: ", imageFile);

        if (imageFile.size > maxSize) {
          setLoading(false);
          return notify("Es dürfen nur Bilder bis zu 10MB hochgeladen werden!");
        }

        // await utils.images.safeSearchImage(imageFile);

        // if (!imageFile.safeSearchRequestSuccess) {
        //   setLoading(false);
        //   return notify(
        //     "Beim Überprüfen der Bild auf explizitem Bildinhalt ist ein Fehler aufgetreten!"
        //   );
        // }

        // if (!imageFile.isSafeSearch) {
        //   setLoading(false);
        //   return notify(
        //     "Es wurden Bilder mit explizitem Bildinhalt erkannt, die abgelehnt wurden!"
        //   );
        // }

        setAvatar(imageFile);
      } catch (err) {
        utils.errorHandling.logToSentry(
          "Error on processing Avatar image!",
          "AvatarDropZone",
          err,
          authContext,
        );
      } finally {
        setLoading(false);
      }
    },
    [authContext, setAvatar, maxSize, notify],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/bmp": [".bmp"],
      "image/gif": [".gif"],
      "image/tiff": [".tif", ".tiff"],
      "image/svg+xml": [".svg"],
      "image/avif": [".avif"],
      "image/vnd.microsoft.icon": [".ico"],
    },
    // maxSize,
    maxFiles: 1,
    // minSize: false,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (avatar) {
        URL.revokeObjectURL(avatar.preview);
      }
    },
    [avatar],
  );

  return (
    <section className={classes.dropZoneContainer}>
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
        {!loading && (
          <input {...getInputProps({ className: classes.dropZone })} />
        )}
        {loading ? (
          <Loading size="25px" style={{ margin: 0 }} />
        ) : uploading ? (
          <CircularProgress
            variant="indeterminate"
            size="25px"
            className={classes.uploadingIcon}
            value={uploadProgress}
          />
        ) : avatar ? null : isDragActive ? (
          <p>{dragActiveText}</p>
        ) : (
          <p>{dragInactiveText}</p>
        )}
        {!loading && avatar && <img src={avatar.preview} alt="" />}
      </div>
    </section>
  );
};

export default AvatarDropZone;
