import React, { useEffect, useState } from "react";
import { S3Resource } from "types";
import { Loading } from "core";
import utils from "utils";
import useStyles from "./styles";

type VideoViewerProps = {
  video: S3Resource | null | undefined;
};

const VideoViewer: React.FC<VideoViewerProps> = ({ video }) => {
  const { classes } = useStyles();

  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!video) {
      return;
    }
    setIsLoading(true);
    utils.images
      .getS3ResourceFileSrc(video)
      .then((videoSrc) => videoSrc && setVideoSrc(videoSrc.url.toString()))
      .finally(() => setIsLoading(false));
  }, [video]);

  if (!video) {
    return null;
  }

  if (isLoading) {
    return (
      <Loading
        size="25px"
        description="Bitte warten. Das Video wird geladen..."
      />
    );
  }

  return (
    <div className={classes.videoWrapper}>
      <video src={videoSrc} className={classes.video} controls />
    </div>
  );
};

export default VideoViewer;
