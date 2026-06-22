import axios from "axios";
export const registerUser = (data) =>
  axios.post("http://localhost:8080/api/auth/register", data);
const BASE_URL = "http://localhost:8080";

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/api/auth/login`, data);

export const getItems = (token) =>
  axios.get(`${BASE_URL}/api/auction/all`, {
    headers: { Authorization: "Bearer " + token }
  });

export const createItem = (data, token) =>
  axios.post(`${BASE_URL}/api/auction/create`, data, {
    headers: { Authorization: "Bearer " + token }
  });

export const placeBid = (id, bid, token) =>
  axios.post(`${BASE_URL}/api/auction/bid/${id}`, bid, {
    headers: { Authorization: "Bearer " + token }
  });

export const deleteItem = (id, token) =>
  axios.delete(`${BASE_URL}/api/auction/delete/${id}`, {
    headers: { Authorization: "Bearer " + token }
  });