import React, { useState } from "react";
import { CustomFormLabelProps, S3Resource } from "types";
import { CustomFormLabel } from "core";
import CustomDialog from "../CustomDialog";
import utils from "utils";
import useStyles from "./styles";

interface ImageViewerProps extends CustomFormLabelProps {
  image: S3Resource | null | undefined;
  marginTop?: number;
  size?: number;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  image,
  marginTop = 16,
  size = 150,

  // CustomFormLabelProps
  info,
  infoContent,
  infoTitle,
  label,
  description,
  nodeBefore,
  nodeAfter,
}) => {
  const { classes } = useStyles();

  const [imagePreviewDialogOpen, setImagePreviewDialogOpen] =
    useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<S3Resource | undefined>(
    undefined,
  );

  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false);

  if (!image) {
    return null;
  }

  const downloadHandler = async () => {
    setIsLoadingDownload(true);
    const fileNameParts = image.key.split("/");
    const fileName = fileNameParts[fileNameParts.length - 1];
    await utils.s3resources.downloadS3Resource(image.key, fileName);
    setIsLoadingDownload(false);
  };

  return (
    <section>
      {imagePreview && (
        <CustomDialog
          dialogOpen={imagePreviewDialogOpen}
          positive={true}
          titleText={label ?? "Bildvorschau"}
          setDialogOpen={setImagePreviewDialogOpen}
          showConfirm={true}
          showDecline={true}
          fullWidth={true}
          maxWidth="md"
          dialogContentStyle={{ padding: 0, paddingTop: "0px !important" }}
          confirmAction={() => downloadHandler()}
          confirmButtonLoading={isLoadingDownload}
          confirmText="Herunterladen"
        >
          <img
            alt={""}
            src={utils.images.getImage(imagePreview)}
            className={classes.imgPreview}
          />
        </CustomDialog>
      )}
      <CustomFormLabel
        info={info}
        infoContent={infoContent}
        infoTitle={infoTitle}
        label={label}
        description={description}
        showRequiredSymbol={false}
        nodeBefore={nodeBefore}
        nodeAfter={nodeAfter}
      />
      <aside className={classes.thumbsContainer} style={{ marginTop }}>
        <div className={classes.thumbWrapper} key={image.s3ResourceID}>
          <div className={classes.thumb} style={{ width: size, height: size }}>
            <div
              className={classes.thumbInner}
              onClick={() => {
                setImagePreview(image);
                setImagePreviewDialogOpen(true);
              }}
            >
              <img
                alt={""}
                src={utils.images.getImage(image, 500, 500)}
                className={classes.img}
              />
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default ImageViewer;
