import authAxios from "./axios";
import type { Practice } from "./types";

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

export const getPresignedUrl = async (practices: Practice[]) => {
  try {
    const keys = practices.map((practice) => practice.fileName);
    const response = await authAxios.post("/api/s3/presigned", keys);
    const urls = response.data;
    const updatedPractices = practices.map((practice, i) => ({
      ...practice,
      url: urls[i],
    }));

    return updatedPractices;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);

    return practices;
  }
};
