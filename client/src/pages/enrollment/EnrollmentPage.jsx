import {useEffect} from "react";
import {useEnrollments} from "../../context/EnrollmentProvider";
import EnrollmentCard from "../../components/EnrollmentCard";
import ButtonCard from "../../components/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function EnrollmentPage() {
  const {enrollments, loadEnrollments} = useEnrollments();

  useEffect(() => {
    loadEnrollments();
  }, []);

  function renderMain() {
    if (enrollments.length === 0)
      return <h1>No hay matrículas registradas.</h1>;
    return enrollments.map((enrollment) => (
      <Col className="d-flex mb-3">
        <EnrollmentCard key={enrollment.id} enrollment={enrollment}/>
      </Col>
    ));
  }

  return (
    <>
      <h1 className="text-5xl text-bg-warning font-bold text-center">Matriculas</h1>
      <Container>
        <ButtonCard entity={{url: "enrollments", name: "Matricula"}}/>
        <Row lg={4}>
          {renderMain()}
        </Row>
      </Container>
    </>
  );
}

export default EnrollmentPage;
