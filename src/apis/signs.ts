import axios from "axios";

export const saveSign = async (url: string) => {
  try {
    const urlObj = new URL(url);
    const key = urlObj.pathname.slice(1);

    const formData = new FormData();

    formData.append("temp_file_name", key);

    const response = await axios.post("/api/signs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return response.data.status;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};

export const getSigns = async () => {
  try {
    const response = await axios.get("/api/signs/list", {
      withCredentials: true,
    });

    return response.data.signs;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};

export const editSignName = async (signId: string, newName: string) => {
  try {
    const formData = new FormData();

    formData.append("sign_id", signId.toString());
    formData.append("new_name", newName);

    const response = await axios.patch("/api/signs/name", formData, {
      withCredentials: true,
    });

    return response.data.editedSign;
  } catch (error: any) {
    const message = error.response?.data?.message;

    alert(message);
  }
};
