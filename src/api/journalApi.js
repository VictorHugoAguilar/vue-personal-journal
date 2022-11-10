import axios from "axios";

const journalApi = axios.create({
    baseURL: "https://vue-demo-612b6-default-rtdb.europe-west1.firebasedatabase.app",
});

// Interceptor para enviar en la peti el idToken para firebase
// journalApi.interceptors.request.use((config) => {
//     config.params = {
//         auth: localStorage.getItem("idToken"),
//     };
//     return config;
// });

export default journalApi;
