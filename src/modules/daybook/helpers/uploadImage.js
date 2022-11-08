import axios from "axios";

const uploadImage = async (file) => {
    if (!file) return;
    try {
        const formData = new FormData();
        formData.append("upload_preset", "vue-demo");
        formData.append("file", file);
        const baseURL = "https://api.cloudinary.com/v1_1/lavaca/image/upload";
        const { data } = await axios.post(baseURL, formData);
        return {
            id: data.public_id,
            extension: data.format,
            url: data.secure_url,
        };
    } catch (error) {
        console.error("error al cargar", error);
        return null;
    }
};

export default uploadImage;
