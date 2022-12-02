import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useEnrollments } from "../../context/EnrollmentProvider";
import Button from "react-bootstrap/Button";

function EnrollmentForm() {
  const { createEnrollment, getEnrollment, updateEnrollment } =
    useEnrollments();
  const [enrollment, setEnrollment] = useState({
    student_id: 0,
    user_id: 0,
    adds: 0,
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEnrollment = async () => {
      if (params.id) {
        const enrollment = await getEnrollment(params.id);
        setEnrollment({
          student_id: enrollment.student_id,
          user_id: enrollment.user_id,
          adds: enrollment.add,
        });
      }
    };
    loadEnrollment();
  }, []);

  return (
    <div className="container pt-5 d-flex justify-content-center">
      <Formik
        initialValues={enrollment}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateEnrollment(params.id, values);
          } else {
            values.is_paid = false;
            await createEnrollment(values);
          }
          navigate("/enrollments");
          setEnrollment({
            student_id: 0,
            user_id: 0,
            adds: 0,
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
                {params.id ? "Editar Matricula" : "Nueva Matricula"}
              </h1>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">
                      ID Estudiante
                    </label>
                    <input
                      type="text"
                      name="student_id"
                      value={values.student_id}
                      placeholder="ID Estudiante"
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">
                      ID Usuario
                    </label>
                    <input
                      type="text"
                      name="user_id"
                      placeholder="ID Usuario"
                      className="form-control"
                      onChange={handleChange}
                      value={values.user_id}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">
                      Documentos Adicionales
                    </label>
                    <input
                      type="text"
                      name="adds"
                      placeholder="write a add"
                      className="form-control"
                      onChange={handleChange}
                      value={values.adds}
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

export default EnrollmentForm;
