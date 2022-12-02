import {useUsers} from "../context/UserProvider";
import {useNavigate} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function UserCard({user}) {
  const {deleteUser} = useUsers();
  const navigate = useNavigate();

  async function handleDelete() {
    await deleteUser(user.id);
  }

  function handleEdit() {
    navigate(`/users/edit/${user.id}`);
  }

  return (
    <Card style={{width: '18rem'}}>
      <Card.Body>
        <Card.Title>{user.name} {user.surname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          DNI: {user.dni}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          NOMBRE: {user.name}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          APELLIDO: {user.surname}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          EMAIL: {user.email}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          ROL: {user.role_id}
        </Card.Subtitle>
        <ButtonGroup aria-label="Basic example">
          <Button variant="warning" onClick={handleEdit}>Editar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
