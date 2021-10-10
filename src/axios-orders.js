import axios from "axios";
const instance = axios.create({
    baseURL:'firebase_URL'
});
export default instance;
