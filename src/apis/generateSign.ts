import authAxios from "./axios";
import { getApiErrorMessage } from "./error";
import type { SignatureStyle } from "./types";

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
    alert(getApiErrorMessage(error));
  }
};
