import React, { useState } from "react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { S3Resource } from "types";
import CustomDialog from "../CustomDialog";
import useStyles from "./styles";

type ImageListViewerProps = {
  images: S3Resource[] | null | undefined;
  marginTop?: number;
  size?: number;
};

const ImageListViewer: React.FC<ImageListViewerProps> = ({
  images,
  marginTop = 16,
  size = 150,
}) => {
  const { classes } = useStyles();

  const [imagePreviewDialogOpen, setImagePreviewDialogOpen] =
    useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<S3Resource | undefined>(
    undefined,
  );

  if (!images) {
    return null;
  }

  return (
    <section>
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
          <StorageImage alt="" path={imagePreview.key} />
        </CustomDialog>
      )}
      <aside className={classes.thumbsContainer} style={{ marginTop }}>
        {images.map((image) => (
          <div className={classes.thumbWrapper} key={image.s3ResourceID}>
            <div
              className={classes.thumb}
              style={{ width: size, height: size }}
            >
              <div
                className={classes.thumbInner}
                onClick={() => {
                  setImagePreview(image);
                  setImagePreviewDialogOpen(true);
                }}
              >
                <StorageImage alt="" path={image.key} sizes="500px" />
              </div>
            </div>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default ImageListViewer;
