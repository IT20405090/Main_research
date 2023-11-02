//backend flask app URL
const API_URL = "http://localhost:5000"; 


export const uploadImageNormalAbnormal = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/predict_normal_abnormal_skin`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading image for normal/abnormal prediction:", error);
  }
};

export const uploadImageSkinRashType = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/predict_skin_rash_type`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading image for skin rash type prediction:", error);
  }
};
