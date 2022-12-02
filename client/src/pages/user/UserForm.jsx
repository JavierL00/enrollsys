import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useUsers } from "../../context/UserProvider";
import Button from "react-bootstrap/Button";

function UserForm() {
  const { createUser, getUser, updateUser } = useUsers();
  const [user, setUser] = useState({
    dni: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    role_id: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (params.id) {
        const user = await getUser(params.id);
        setUser({
          dni: user.dni,
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          role_id: user.role_id,
        });
      }
    };
    loadUser();
  }, []);

  return (
    <div className="container pt-5 d-flex justify-content-center">
      <Formik
        initialValues={user}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateUser(params.id, values);
          } else {
            await createUser(values);
          }
          navigate("/users");
          setUser({
            dni: 0,
            name: "",
            surname: "",
            email: "",
            password: "",
            role_id: 0,
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
                {params.id ? "Editar Usuario" : "Nuevo Usuario"}
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
                    <label className="block">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={handleChange}
                      value={values.password}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={"col-sm-12"}>
                  <div className={"form-group"}>
                    <label className="block">Rol</label>
                    <input
                      type="text"
                      name="role_id"
                      placeholder="Rol"
                      className="form-control"
                      onChange={handleChange}
                      value={values.role_id}
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

export default UserForm;
