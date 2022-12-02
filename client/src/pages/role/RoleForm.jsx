import {useRoles} from "../../context/RoleProvider";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import Button from 'react-bootstrap/Button';

function RoleForm() {
  const {createRole, getRole, updateRole} = useRoles();
  const [role, setRole] = useState({
    name: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadRole = async () => {
      if (params.id) {
        const role = await getRole(params.id);
        setRole({
          name: role.name,
        });
      }
    };
    loadRole();
  }, []);

  return (
    <div>
      <div className="container pt-5 d-flex justify-content-center">
        <Formik
          initialValues={role}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updateRole(params.id, values);
            } else {
              await createRole(values);
            }
            navigate("/roles");
            setRole({
              name: "",
            });
          }}
        >
          {({handleChange, handleSubmit, values, isSubmitting}) => (
            <Form
              onSubmit={handleSubmit}
              className={"card px-1 py-4"}
            >
              <div className="card-body p-5">
                <h1 className="card-title mb-3 text-center">
                  {params.id ? "Editar Rol" : "Nuevo Rol"}
                </h1>
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
    </div>
  );
}

export default RoleForm;
