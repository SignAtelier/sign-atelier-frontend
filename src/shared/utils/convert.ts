export const blobToCanvas = async (
  blob: Blob
): Promise<{ canvas: HTMLCanvasElement; image: HTMLImageElement }> => {
  const url = URL.createObjectURL(blob);
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        URL.revokeObjectURL(url);
        return reject("context 생성에 실패했습니다.");
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve({ canvas, image: img });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject("이미지 로드에 실패했습니다.");
    };

    img.src = url;
  });
};
