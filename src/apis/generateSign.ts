import authAxios from "./axios";
import type { SignatureStyle } from "./types";

const getErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return "서버 오류가 발생했습니다.";
};

export const generateSign = async (name: string, style: SignatureStyle) => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("style", style);

    const response = await authAxios.post("/api/signs/request", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.detail;
  } catch (error: unknown) {
    alert(getErrorMessage(error));
  }
};
