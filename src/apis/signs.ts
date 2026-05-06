import authAxios from "./axios";
import { getApiErrorCode, getApiErrorMessage } from "./error";

export const saveSign = async (url: string) => {
  try {
    const urlObj = new URL(url);
    const key = urlObj.pathname.slice(1);

    const formData = new FormData();

    formData.append("temp_file_name", key);

    const response = await authAxios.post("/api/signs/upload", formData);

    return response.data.status;
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));
  }
};

export const getSignsByStatus = async (isDeleted: boolean) => {
  try {
    const response = await authAxios.get("/api/signs/list", {
      params: { is_deleted: isDeleted },
    });

    return response.data.signs;
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));
  }
};

export const editSignName = async (signId: string, newName: string) => {
  try {
    const formData = new FormData();

    formData.append("sign_id", signId);
    formData.append("new_name", newName);

    const response = await authAxios.patch("/api/signs/name", formData);

    return response.data.editedSign;
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));
  }
};

export const deleteSign = async (signId: string) => {
  try {
    const response = await authAxios.delete("/api/signs/soft", {
      data: { sign_id: signId },
    });

    return response.data.deletedSign;
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));
  }
};

export const restoreSign = async (signId: string) => {
  try {
    const response = await authAxios.post("/api/signs/restore", {
      sign_id: signId,
    });

    return response.data.restoredSign;
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));

    return getApiErrorCode(error);
  }
};

export const deleteSignHard = async (signId: string) => {
  try {
    await authAxios.delete("/api/signs/hard", {
      data: { sign_id: signId },
    });
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));
  }
};

export const getSign = async (signId: string) => {
  try {
    const response = await authAxios.get(`/api/signs/sign/${signId}`);

    return response.data.url;
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));
  }
};

export const getSignOutline = async (
  signId: string,
  width: number,
  height: number
) => {
  try {
    const response = await authAxios.get(
      `/api/signs/outline/${signId}?width=${width}&height=${height}`
    );

    return response.data;
  } catch (error: unknown) {
    alert(getApiErrorMessage(error));
  }
};
