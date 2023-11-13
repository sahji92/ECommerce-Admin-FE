import axios from "axios";
import { getCookie } from "./utils/getCookie";

const apiConnection = async (endpoint, method, payload = null) => {
    return await axios({
        method,
        url: `http://127.0.0.1:8000${endpoint}`,
        data: {
            ...payload
        },
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }

    })
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => console.log(err))
}

export default apiConnection;