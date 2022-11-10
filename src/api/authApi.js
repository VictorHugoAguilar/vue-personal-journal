import axios from "axios";

const authApi = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
    params: {
        key: "AIzaSyC1A8HSY0NEfbjXRHheFfLNrsHbT36qr2Y",
    },
});

export default authApi;
