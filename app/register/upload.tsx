// utils/uploadToCloudinary.ts
import axios from "axios";

export const uploadToCloudinary = async (file: File, folder = "startup_files") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset"); // <-- Use this as per screenshot

    const cloudName = "dng61q3lg";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

    const response = await axios.post(url, formData);
    return response.data.secure_url;
};
