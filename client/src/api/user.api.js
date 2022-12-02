import axios from "axios";

export const getUsersRequest = async () =>
  await axios.get("http://localhost:4000/users");

export const getUserByIdRequest = async (id) =>
  await axios.get(`http://localhost:4000/users/${id}`);

export const createUserRequest = async (data) =>
  await axios.post("http://localhost:4000/users", data);

export const updateUserRequest = async (id, data) =>
  await axios.put(`http://localhost:4000/users/${id}`, data);

export const deleteUserRequest = async (id) =>
  await axios.delete(`http://localhost:4000/users/${id}`);
