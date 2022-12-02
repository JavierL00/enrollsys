import { useStudents } from "../../context/StudentProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Button from "react-bootstrap/Button";

function StudentForm() {
  const { createStudent, getStudent, updateStudent } = useStudents();
  const [student, setStudent] = useState({
    dni: "",
    name: "",
    surname: "",
    age: "",
    address: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadStudent = async () => {
      if (params.id) {
        const student = await getStudent(params.id);
        setStudent({
          dni: student.dni,
          name: student.name,
          surname: student.surname,
          age: student.age,
          address: student.address,
        });
      }
    };
    loadStudent();
  }, []);

  return (
    <div className="container pt-5 d-flex justify-content-center">
      <Formik
        initialValues={student}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateStudent(params.id, values);
          } else {
            await createStudent(values);
          }
          navigate("/students");
          setStudent({
            dni: 0,
            name: "",
            surname: "",
            age: 0,
            address: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            className={"card px-1 py-4"}
            onSubmit={handleSubmit}
          >
            <div className="card-body p-5">
              <h1 className="card-title mb-3 text-center">
                {params.id ? "Editar Estudiante" : "Nuevo Estudiante"}
              </h1>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">DNI</label>
                    <input
                      type="text"
                      name="dni"
                      placeholder="DNI"
                      className="form-control"
                      onChange={handleChange}
                      value={values.dni}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      className="form-control"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">Apellido</label>
                    <input
                      type="text"
                      name="surname"
                      placeholder="Apellido"
                      className="form-control"
                      onChange={handleChange}
                      value={values.surname}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">Edad</label>
                    <input
                      type="text"
                      name="age"
                      placeholder="Edad"
                      className="form-control"
                      onChange={handleChange}
                      value={values.age}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">Direccion</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Direccion"
                      className="form-control"
                      onChange={handleChange}
                      value={values.address}
                    />
                  </div>
                </div>
              </div>
              <Button
                variant="success"
                type="submit"
                disabled={isSubmitting}
                className={"mt-3"}
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudentForm;
