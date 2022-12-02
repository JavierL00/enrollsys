import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function ButtonCard({ entity }) {
  return (
    <Link to={`/${entity.url}/new`}>
      <Button variant="success" className="mb-3">Crear {entity.name}</Button>
    </Link>
  );
}

export default ButtonCard;
