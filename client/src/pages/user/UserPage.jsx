import {useEffect} from "react";
import {useUsers} from "../../context/UserProvider";
import UserCard from "../../components/UserCard";
import ButtonCard from "../../components/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserPage() {
  const {users, loadUsers} = useUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  function renderMain() {
    if (users.length === 0) return <h1>No hay usuarios aún.</h1>;
    return users.map((user) => (
      <Col className="d-flex mb-3">
        <UserCard key={user.id} user={user}/>
      </Col>
    ));
  }

  return (
    <>
      <h1 className="text-5xl text-bg-warning font-bold text-center">Usuarios</h1>
      <Container>
        <ButtonCard entity={{url: "users", name: "Usuario"}}/>
        <Row lg={4}>
          {renderMain()}
        </Row>
      </Container>
    </>
  );
}

export default UserPage;
