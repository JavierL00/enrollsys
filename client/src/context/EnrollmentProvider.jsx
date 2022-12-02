import { useContext, useState } from "react";
import { EnrollmentContext } from "./Context";
import {
  getEnrollmentsRequest,
  getEnrollmentByIdRequest,
  createEnrollmentRequest,
  updateEnrollmentRequest,
  deleteEnrollmentRequest,
  toggleEnrollmentPaidRequest,
} from "../api/enrollment.api";

export const useEnrollments = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error("useEnrollments must be used within a EnrollmentProvider");
  }
  return context;
};

export const EnrollmentContextProvider = ({ children }) => {
  const [enrollments, setEnrollments] = useState([]);

  async function loadEnrollments() {
    const response = await getEnrollmentsRequest();
    setEnrollments(response.data);
  }

  const getEnrollment = async (id) => {
    try {
      const response = await getEnrollmentByIdRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createEnrollment = async (enrollment) => {
    try {
      await createEnrollmentRequest(enrollment);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEnrollment = async (id, data) => {
    try {
      await updateEnrollmentRequest(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEnrollment = async (id) => {
    try {
      await deleteEnrollmentRequest(id);
      setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleeEnrollmentPaid = async (id) => {
    try {
      const enrollmentFound = enrollments.find((enrollment) => enrollment.id === id);
      await toggleEnrollmentPaidRequest(id, enrollmentFound.is_paid === 0 ? true : false);
      setEnrollments(
        enrollments.map((enrollment) =>
          enrollment.id === id ? { ...enrollment, is_paid: !enrollment.is_paid } : enrollment
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EnrollmentContext.Provider
      value={{
        enrollments,
        loadEnrollments,
        getEnrollment,
        createEnrollment,
        updateEnrollment,
        deleteEnrollment,
        toggleeEnrollmentPaid
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};
