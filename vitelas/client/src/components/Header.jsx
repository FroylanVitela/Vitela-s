
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../img/logo.png';

export default function Header() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img
            src={logo}
            alt="Vitela's Logo"
            className="logo"
          />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Bienvenida</Link>
          </li>
          <li>
            <Link to="/catalog">Catálogo</Link>
          </li>
          <li>
            <Link to="/contact">Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}