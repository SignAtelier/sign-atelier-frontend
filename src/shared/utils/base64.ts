export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const base64ToFile = (base64: string, name: string) => {
  const mimeMatch = base64.match(/data:(.*?);base64,/);
  const mime = mimeMatch?.[1] || "application/octet-stream";

  const b64Data = base64.split(",")[1];
  const byteString = atob(b64Data);
  const u8arr = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    u8arr[i] = byteString.charCodeAt(i);
  }

  return new File([u8arr], name, { type: mime });
};
