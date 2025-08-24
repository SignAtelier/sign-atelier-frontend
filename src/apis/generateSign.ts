import authAxios from "./axios";

export const generateSign = async (file: File, name: string) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", name);

    const response = await authAxios.post("/api/signs/request", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.detail;
  } catch (error: any) {
    const message = error.response?.data?.message || "서버 오류가 발생했습니다";

    alert(message);
  }
};
