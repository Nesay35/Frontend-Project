import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";


const baseURL = config.api.baseUrl;

export const getStudentsByPage = async (page=0, size=20, sort="name", type="ASC") => {
  const resp = await axios.get(`${baseURL}/students/search?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const deleteStudent = async (id) => { 
  const resp = await axios.delete(`${baseURL}/students/delete/${id}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }

 export const createStudent = async (payload) => { 
  const resp = await axios.delete(`${baseURL}/students/save`, payload ,{
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }
