import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;


export const getAdminsByPage = async (page=0, size=20, sort="name", type="ASC") => {
    const resp = await axios.get(`${baseURL}/admin/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,{
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
}