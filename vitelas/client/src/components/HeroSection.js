import './HeroSection.css';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Personaliza lo que imaginas</h1>
        <p>Tazas, botellas, vidrio, llaveros y ropa con tu diseño.</p>
        <Link to="/catalog" className="cta">Explorar catálogo</Link>
      </div>
    </section>
  );
}