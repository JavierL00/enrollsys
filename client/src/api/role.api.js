import axios from "axios";

export const getRolesRequest = async () =>
  await axios.get("http://localhost:4000/roles");

export const getRoleByIdRequest = async (id) =>
  await axios.get(`http://localhost:4000/roles/${id}`);

export const createRoleRequest = async (data) =>
  await axios.post("http://localhost:4000/roles", data);

export const updateRoleRequest = async (id, data) =>
  await axios.put(`http://localhost:4000/roles/${id}`, data);

export const deleteRoleRequest = async (id) =>
  await axios.delete(`http://localhost:4000/roles/${id}`);
