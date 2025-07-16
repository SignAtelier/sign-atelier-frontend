import { getOpenCV } from "./opencv";

export const getContourMask = async (canvas: HTMLCanvasElement) => {
  const cv = await getOpenCV();
  const src = cv.imread(canvas);
  const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  cv.findContours(
    src,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );

  const mask = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC1);

  for (let i = 0; i < contours.size(); ++i) {
    cv.drawContours(
      mask,
      contours,
      i,
      new cv.Scalar(255),
      6,
      cv.LINE_8,
      hierarchy,
      100
    );
  }

  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();

  return mask;
};

export const getDiceConfident = async (mask1: any, mask2: any) => {
  const cv = await getOpenCV();
  const intersection = new cv.Mat();

  cv.bitwise_and(mask1, mask2, intersection);

  const mask1PixelsCounts = cv.countNonZero(mask1);
  const mask2PixelsCounts = cv.countNonZero(mask2);
  const intersectionPixelCounts = cv.countNonZero(intersection);

  intersection.delete();

  return (
    (2 * intersectionPixelCounts) / (mask1PixelsCounts + mask2PixelsCounts)
  );
};
