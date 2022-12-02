import {useRoles} from "../../context/RoleProvider";
import RoleCard from "../../components/RoleCard";
import {useEffect} from "react";
import ButtonCard from "../../components/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RolesPage() {
  const {roles, loadRoles} = useRoles();

  useEffect(() => {
    loadRoles();
  }, []);

  function renderMain() {
    if (roles.lenght === 0) return <h1>No se encontraron roles.</h1>;
    return roles.map((role) => (
      <Col className="d-flex mb-3">
        <RoleCard key={role.id} role={role}/>
      </Col>
    ));
  }

  return (
    <>
      <h1 className="text-5xl text-bg-warning font-bold text-center">Roles</h1>
      <Container>
        <ButtonCard entity={{url: "roles", name: "Rol"}}/>
        <Row lg={4}>
          {renderMain()}
        </Row>
      </Container>
    </>
  );
}

export default RolesPage;
