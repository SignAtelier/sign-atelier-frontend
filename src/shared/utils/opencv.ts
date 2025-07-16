import cvReadyPromise from "@techstark/opencv-js";

export const getOpenCV = async () => {
  const cv = await cvReadyPromise;

  return cv;
};
