import axios from "axios";

const journalApi = axios.create({
    baseURL: "https://vue-demo-612b6-default-rtdb.europe-west1.firebasedatabase.app",
});

export default journalApi;
