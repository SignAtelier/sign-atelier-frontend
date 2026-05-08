import authAxios from "./axios";
import { throwApiError } from "./error";

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
  } catch (error: unknown) {
    throwApiError(error);
  }
};

export const getPractices = async (signId: string) => {
  try {
    const response = await authAxios.get(
      `/api/practices/list?sign_id=${signId}`
    );

    return response.data;
  } catch (error: unknown) {
    throwApiError(error);
  }
};

export const getPresignedUrl = async (keys: string[]) => {
  try {
    const response = await authAxios.post("/api/s3/presigned", keys);

    return response.data;
  } catch (error: unknown) {
    throwApiError(error);
  }
};

export const downloadPractice = async (fileName: string) => {
  try {
    const response = await authAxios.get("/api/practices/download", {
      params: { file_name: fileName },
      responseType: "blob",
    });
    const responseUrl = URL.createObjectURL(response.data);
    const a = document.createElement("a");

    a.href = responseUrl;
    a.download = "practice.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(responseUrl);
  } catch (error: unknown) {
    throwApiError(error, "다운로드 링크 만료. 새로고침 해주세요");
  }
};

export const deletePractices = async (fileNames: string[]) => {
  try {
    const response = await authAxios.delete("/api/practices", {
      data: fileNames,
    });

    return response.data.code;
  } catch (error: unknown) {
    throwApiError(error);
  }
};
