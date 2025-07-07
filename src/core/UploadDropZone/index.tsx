import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  CircularProgress,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { useLayoutContext } from "hooks";
import { CloseIcon, DeleteIcon, DoneIcon, WatchClockTimeIcon } from "icons";
import { nanoid } from "nanoid";
import { useDropzone } from "react-dropzone";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles, S3Resource } from "types";
import { DeleteImageDialog } from "components";
import CustomDialog from "../CustomDialog";
import CustomFormLabel from "../CustomFormLabel";
import Loading from "../Loading";
import useStyles from "./styles";

interface UploadDropZoneProps extends CustomFormLabelProps {
  dragActiveText: string;
  dragInactiveText: string;
  images: S3Resource[];
  setImages: React.Dispatch<React.SetStateAction<S3Resource[]>>;
  maxFiles?: number;
  maxSize?: number;
  uploading: boolean;
  uploadProgress: number;
  showSaveInfo: boolean;
  saveInfoText: string;
  required?: boolean;
}

const UploadDropZoneComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  UploadDropZoneProps
> = (
  {
    dragActiveText,
    dragInactiveText,
    images,
    setImages,
    maxFiles = 10,
    maxSize = 10000000, // 10MB
    uploading,
    uploadProgress,
    showSaveInfo = false,
    saveInfoText,
    required = false,

    // CustomFormLabelProps
    info,
    infoContent,
    infoTitle,
    label,
    description,
    id = nanoid(),
    showRequiredSymbol,
    nodeBefore,
    nodeAfter,
  },
  uploadDropZoneRef,
) => {
  const { classes, cx } = useStyles();
  const { notify } = useLayoutContext();

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

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

  const [saveInfo, setSaveInfo] = useState<boolean>(
    showSaveInfo && Boolean(images.find((image) => !image.fromDatabase)),
  );

  useEffect(() => {
    setSaveInfo(
      showSaveInfo && Boolean(images.find((image) => !image.fromDatabase)),
    );
  }, [images, showSaveInfo]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      let newImages = acceptedFiles.map((file) => {
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
          s3ResourceID: file.name + " - " + nanoid(),
          fromDatabase: false,
          bucket: "",
          region: "",
          key: file.name,
        });
      });

      newImages = newImages.filter((newImage) => {
        if (newImage.size > maxSize) {
          notify("Es dürfen nur Bilder bis zu 10MB hochgeladen werden!");
          return false;
        } else {
          return true;
        }
      });

      console.log("newImages: ", newImages);

      setImages((prevState) => {
        if (prevState.length + newImages.length > maxFiles) {
          const allowedImages = newImages.slice(0, maxFiles - prevState.length);
          notify("Nur eine bestimmte Anzahl von Bildern erlaubt: " + maxFiles);

          return [...prevState, ...allowedImages];
        } else {
          return [...prevState, ...newImages];
        }
      });
      setInputStatus("default");
    },
    [maxFiles, setImages, maxSize, notify],
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
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [images],
  );

  const [imagePreviewDialogOpen, setImagePreviewDialogOpen] =
    useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<S3Resource | undefined>(
    undefined,
  );

  const [deleteImageDialogOpen, setDeleteImageDialogOpen] =
    useState<boolean>(false);
  const [imageToDelete, setImageToDelete] = useState<S3Resource | undefined>(
    undefined,
  );

  return (
    <>
      <CustomFormLabel
        info={info}
        infoContent={infoContent}
        infoTitle={infoTitle}
        label={label}
        description={description}
        id={id}
        showRequiredSymbol={required && showRequiredSymbol}
        nodeBefore={nodeBefore}
        nodeAfter={nodeAfter}
        errorLabel={inputStatus === "error"}
      />

      <section className={classes.dropZoneContainer}>
        {imagePreview && (
          <CustomDialog
            dialogOpen={imagePreviewDialogOpen}
            positive={false}
            titleText="Bildvorschau"
            setDialogOpen={setImagePreviewDialogOpen}
            showConfirm={false}
            showDecline={false}
            fullWidth={true}
            maxWidth="md"
            contentPadding={0}
          >
            {imagePreview.extension.includes("svg") &&
            imagePreview.fromDatabase ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: "<svg" + imagePreview.preview.split("<svg")[1],
                }}
                className={classes.imgPreview}
              ></span>
            ) : (
              <img
                alt={""}
                src={imagePreview.preview}
                className={classes.imgPreview}
              />
            )}
          </CustomDialog>
        )}
        {imageToDelete && (
          <DeleteImageDialog
            dialogOpen={deleteImageDialogOpen}
            setDialogOpen={setDeleteImageDialogOpen}
            setImages={setImages}
            image={imageToDelete}
          />
        )}
        <aside className={classes.thumbsContainer}>
          {images.map((image) => (
            <div className={classes.thumbWrapper} key={image.s3ResourceID}>
              <div className={classes.thumb}>
                <div
                  className={classes.thumbInner}
                  onClick={() => {
                    setImagePreview(image);
                    setImagePreviewDialogOpen(true);
                  }}
                >
                  {image.extension.includes("svg") && image.fromDatabase ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: "<svg" + image.preview.split("<svg")[1],
                      }}
                      className={classes.img}
                    ></span>
                  ) : (
                    <img alt={""} src={image.preview} className={classes.img} />
                  )}

                  <div
                    className={image.fromDatabase ? "" : classes.imageOverlay}
                  >
                    {!image.fromDatabase && (
                      <IconButton
                        size="small"
                        className={classes.removeImage}
                        onClick={() => {
                          setImages((prevImages) =>
                            prevImages.filter(
                              (prevImage) =>
                                prevImage.s3ResourceID !== image.s3ResourceID,
                            ),
                          );
                        }}
                      >
                        <CloseIcon className={classes.removeIcon} />
                      </IconButton>
                    )}

                    {image.fromDatabase ? null : image.uploadStatus ? (
                      <DoneIcon className={classes.doneIcon} />
                    ) : image.uploading ? (
                      <CircularProgress
                        variant="determinate"
                        size="25px"
                        className={classes.uploadingIcon}
                        value={uploadProgress}
                      />
                    ) : image.processing ? (
                      <Loading className={classes.processingIcon} size="25px" />
                    ) : (
                      <WatchClockTimeIcon className={classes.waitingIcon} />
                    )}
                  </div>
                </div>
              </div>
              {!uploading && image.fromDatabase && (
                <IconButton
                  onClick={() => {
                    setImageToDelete(image);
                    setDeleteImageDialogOpen(true);
                  }}
                  aria-label="delete"
                  className={classes.deleteButton}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ))}
        </aside>
        {showSaveInfo && (
          <Collapse
            style={{
              margin: saveInfo ? "10px auto" : 0,
            }}
            in={saveInfo}
          >
            <Typography className={classes.saveInfo}>{saveInfoText}</Typography>
          </Collapse>
        )}
        {images.length < maxFiles && !uploading && (
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
            <input
              {...getInputProps({ className: classes.dropZone })}
              id={id}
            />
            {isDragActive ? (
              <p>{dragActiveText}</p>
            ) : (
              <p className={inputStatus === "error" ? classes.inputError : ""}>
                {dragInactiveText}
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default React.forwardRef(UploadDropZoneComponent);
