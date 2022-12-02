import {useStudents} from "../../context/StudentProvider";
import StudentCard from "../../components/StudentCard";
import {useEffect} from "react";
import ButtonCard from "../../components/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StudentPage() {
  const {students, loadStudents} = useStudents();

  useEffect(() => {
    loadStudents();
  }, []);

  function renderMain() {
    if (students.length === 0) return <h1>No hay estudiantes aún.</h1>;
    return students.map((student) => (
      <Col className="d-flex mb-3">
        <StudentCard key={student.id} student={student}/>
      </Col>
    ));
  }

  return (
    <>
      <h1 className="text-5xl text-bg-warning font-bold text-center">Estudiantes</h1>
      <Container>
        <ButtonCard entity={{url: "students", name: "Estudiante"}}/>
        <Row lg={4}>
          {renderMain()}
        </Row>
      </Container>
    </>
  );
}

export default StudentPage;
