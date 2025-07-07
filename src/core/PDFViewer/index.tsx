import React, { useEffect, useState } from "react";
import { S3Resource } from "types";
import { Loading } from "core";
import utils from "utils";
import useStyles from "./styles";

type PDFViewerProps = {
  pdf: S3Resource | null | undefined;
};

const PDFViewer: React.FC<PDFViewerProps> = ({ pdf }) => {
  const { classes } = useStyles();

  const [pdfSrc, setPDFSrc] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!pdf) {
      return;
    }
    setIsLoading(true);
    utils.images
      .getS3ResourceFileSrc(pdf)
      .then((pdfSrc) => pdfSrc && setPDFSrc(pdfSrc.url.toString()))
      .finally(() => setIsLoading(false));
  }, [pdf]);

  if (!pdf) {
    return null;
  }

  if (isLoading) {
    return (
      <Loading
        size="25px"
        description="Bitte warten. Das PDF wird geladen..."
      />
    );
  }

  return (
    <div className={classes.pdfWrapper}>
      <object
        data={pdfSrc}
        type="application/pdf"
        width="100%"
        height="1000px"
        className={classes.pdf}
      >
        <p>
          Unable to display PDF file.{" "}
          <a href="/uploads/media/default/0001/01/540cb75550adf33f281f29132dddd14fded85bfc.pdf">
            Download
          </a>{" "}
          instead.
        </p>
      </object>
    </div>
  );
};

export default PDFViewer;
