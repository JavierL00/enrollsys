import { useContext, useState } from "react";
import { StudentContext } from "./Context";
import {
  getStudentsRequest,
  getStudentByIdRequest,
  createStudentRequest,
  updateStudentRequest,
  deleteStudentRequest,
} from "../api/student.api";

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};

export const StudentContextProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    const response = await getStudentsRequest();
    setStudents(response.data);
  }

  const getStudent = async (id) => {
    try {
      const response = await getStudentByIdRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createStudent = async (student) => {
    try {
      await createStudentRequest(student);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudent = async (id, data) => {
    try {
      await updateStudentRequest(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await deleteStudentRequest(id);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loadStudents,
        getStudent,
        createStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
