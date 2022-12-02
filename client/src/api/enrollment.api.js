import axios from "axios";

export const getEnrollmentsRequest = async () =>
  await axios.get("http://localhost:4000/enrollments");

export const getEnrollmentByIdRequest = async (id) =>
  await axios.get(`http://localhost:4000/enrollments/${id}`);

export const createEnrollmentRequest = async (data) =>
  await axios.post("http://localhost:4000/enrollments", data);

export const updateEnrollmentRequest = async (id, data) =>
  await axios.put(`http://localhost:4000/enrollments/${id}`, data);

export const deleteEnrollmentRequest = async (id) =>
  await axios.delete(`http://localhost:4000/enrollments/${id}`);

export const toggleEnrollmentPaidRequest = async (id, is_paid) =>
  await axios.put(`http://localhost:4000/enrollments/${id}`, { is_paid });
