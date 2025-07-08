import { useLayoutEffect, useRef } from "react";
import { getUUID } from "utils/identify";
import { measureHeight } from "utils/print";

export const useMeasure = (
  onMeasure: (height: number) => void,
  objectToList: any,
) => {
  const measureRef = useRef<HTMLDivElement>(null);
  const measureId = getUUID();

  useLayoutEffect(() => {
    const measure = () => measureHeight(measureId, onMeasure);
    measure();

    // Nach Änderungen erneut messen
    const observer = new MutationObserver(measure);
    if (measureRef.current) {
      observer.observe(measureRef.current, {
        characterData: true,
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    setTimeout(() => {
      measure();
    }, 300);

    return () => observer.disconnect();
  }, [onMeasure, measureId, objectToList]);

  return { measureRef, elementId: measureId };
};
