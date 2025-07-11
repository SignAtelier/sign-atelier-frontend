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
