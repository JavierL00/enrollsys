import { useStudents } from "../context/StudentProvider";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function StudentCard({ student }) {
  const { deleteStudent } = useStudents();
  const navigate = useNavigate();

  function handleDelete() {
    deleteStudent(student.id);
  }

  function handleEdit() {
    navigate(`/students/edit/${student.id}`);
  }

  return (
    <Card style={{width: '18rem'}}>
      <Card.Body>
        <Card.Title>{student.name} {student.surname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          DNI: {student.dni}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          NOMBRE: {student.name}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          APELLIDO: {student.surname}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          EDAD: {student.age}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          DIRECCION: {student.address}
        </Card.Subtitle>
        <ButtonGroup aria-label="Basic example">
          <Button variant="warning" onClick={handleEdit}>Editar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;
