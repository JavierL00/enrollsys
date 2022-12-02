import axios from "axios";

export const getStudentsRequest = async () =>
  await axios.get("http://localhost:4000/students");

export const getStudentByIdRequest = async (id) =>
  await axios.get(`http://localhost:4000/students/${id}`);

export const createStudentRequest = async (data) =>
  await axios.post("http://localhost:4000/students", data);

export const updateStudentRequest = async (id, data) =>
  await axios.put(`http://localhost:4000/students/${id}`, data);

export const deleteStudentRequest = async (id) =>
  await axios.delete(`http://localhost:4000/students/${id}`);
