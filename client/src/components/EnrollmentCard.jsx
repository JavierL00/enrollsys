import { useEnrollments } from "../context/EnrollmentProvider";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

function EnrollmentCard({ enrollment }) {
  const { deleteEnrollment, toggleeEnrollmentPaid } = useEnrollments();
  const navigate = useNavigate();

  async function handleDelete() {
    await deleteEnrollment(enrollment.id);
  }

  const handlePaid = async () => {
    await toggleeEnrollmentPaid(enrollment.id);
  }

  function handleEdit() {
    navigate(`/enrollments/edit/${enrollment.id}`);
  }

  return (
    <Card style={{width: '18rem'}}>
      <Card.Body>
        <Card.Title>Matricula N° {enrollment.id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Pagado: {enrollment.is_paid == 1 ? "️✅️" : "❌"}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          ID Estudiante: {enrollment.student_id}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          ID Usuario: {enrollment.user_id}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Doc. Adicionales: {enrollment.adds}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Fecha de Registro: {enrollment.createAt}
        </Card.Subtitle>
        <ButtonGroup aria-label="Basic example">
          <Button variant="warning" onClick={handleEdit}>Editar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="info" onClick={() => handlePaid(enrollment.is_paid)}>Pagado</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default EnrollmentCard;
