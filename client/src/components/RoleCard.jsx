import { useRoles } from "../context/RoleProvider";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function RoleCard({ role }) {
  const { deleteRole } = useRoles();
  const navigate = useNavigate();

  async function handleDelete() {
    await deleteRole(role.id);
  }

  function handleEdit() {
    navigate(`/roles/edit/${role.id}`);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{role.name}</Card.Title>
        <ButtonGroup aria-label="Basic example">
          <Button variant="warning" onClick={handleEdit}>Editar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default RoleCard;
