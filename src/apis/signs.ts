import authAxios from "./axios";

export const saveSign = async (url: string) => {
  try {
    const urlObj = new URL(url);
    const key = urlObj.pathname.slice(1);

    const formData = new FormData();

    formData.append("temp_file_name", key);

    const response = await authAxios.post("/api/signs/upload", formData);

    return response.data.status;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};

export const getSigns = async () => {
  try {
    const response = await authAxios.get("/api/signs/list");

    return response.data.signs;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};

export const editSignName = async (signId: string, newName: string) => {
  try {
    const formData = new FormData();

    formData.append("sign_id", signId);
    formData.append("new_name", newName);

    const response = await authAxios.patch("/api/signs/name", formData);

    return response.data.editedSign;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};

export const deleteSign = async (signId: string) => {
  try {
    const response = await authAxios.delete("/api/signs/soft", {
      data: { sign_id: signId },
    });

    return response.data.deletedSign;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};
