import axios from "axios";
import authAxios from "./axios";

export const uploadPractice = async (file: File, signId: string) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("sign_id", signId);

    const response = await authAxios.post("/api/practices/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.detail;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};

export const getPractices = async (signId: string) => {
  try {
    const response = await authAxios.get(
      `/api/practices/list?sign_id=${signId}`
    );

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};

export const getPresignedUrl = async (keys: string[]) => {
  try {
    const response = await authAxios.post("/api/s3/presigned", keys);

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};

export const downloadPractice = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: "blob" });
    const responseUrl = URL.createObjectURL(response.data);
    const a = document.createElement("a");

    a.href = responseUrl;
    a.download = "signature.png";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  } catch {
    alert("다운로드 링크 만료. 새로고침 해주세요");
  }
};
