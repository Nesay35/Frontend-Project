import axios from "axios"
import { getAuthHeader } from "./auth-header";

export const login = async (payload) => {
    const resp = await axios.post("https://mycampusmates.com/app/auth/login",
        payload
    );
    const data = await resp.data;
    return data;
}

export const getUser = async () => {
    const resp = await axios.get("https://mycampusmates.com/app/user/me", {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
}