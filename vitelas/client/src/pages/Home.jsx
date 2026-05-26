import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import logoVitelas from '../assets/vitela-logo-red.png';
import caballero from '../assets/caballero.png';
import dama from '../assets/dama.png';
import nino from '../assets/niño.png';
import slider4 from '../assets/slider4.png';

const modelos = [
  { src: caballero, alt: 'Modelo con playera personalizada' },
  { src: dama, alt: 'Modelo con sudadera personalizada' },
  { src: nino, alt: 'Modelo con taza sublimada' },
  { src: slider4, alt: 'Modelo con set de regalo' },
  { src: '/imgs/modelosenna.png', alt: 'Modelo con camiseta personalizada' },
];

export default function Home() {
  const heroRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slider automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % modelos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <main className="home">
      {/* HERO SECTION */}
      <section className="hero-minimal" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-badge">Regalos personalizados</div>
          <h1 className="hero-title">
            El regalo <span className="highlight">perfecto</span> para toda ocasión
          </h1>
          <p className="hero-desc">
            Creamos productos únicos con tecnología DTF y sublimación. 
            Tazas, playeras, sudaderas y accesorios personalizados listos para regalar.
          </p>
          <div className="hero-ctas">
            <Link to="/catalog" className="btn-hero-primary">Ver Catálogo</Link>
            <Link to="/contact" className="btn-hero-secondary">Contactar</Link>
          </div>
          <div className="hero-tags">
            <span className="tag">✓ DTF & Sublimación</span>
            <span className="tag">✓ Mayoreo y menudeo</span>
            <span className="tag">✓ Entrega en 1-5 días</span>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-slider">
            {modelos.map((img, i) => (
              <div 
                key={i} 
                className={`hero-slide ${i === currentSlide ? 'active' : ''}`}
              >
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
            <div className="hero-dots">
              {modelos.map((_, i) => (
                <button 
                  key={i} 
                  className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Lo que creamos</h2>
          <p>Calidad garantizada en cada producto</p>
        </div>
        <div className="categories-grid">
          {categorias.map((cat, i) => (
            <Link to="/catalog" key={i} className="category-card">
              <span className="category-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* MODELOS / GALERÍA */}
      <section className="gallery-section">
        <div className="section-header">
          <h2>Trabajos Realizados</h2>
          <p>Cada diseño es único, cada cliente diferente</p>
        </div>
        <div className="gallery-grid">
          {modelos.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img.src} alt={img.alt} />
              <div className="gallery-overlay">
                <span>Ver trabajo</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-cta">
          <Link to="/catalog" className="btn-link">Ver más productos →</Link>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services-section">
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎨</div>
            <h3>Diseño Personalizado</h3>
            <p>Envíanos tu diseño o nosotros lo creamos. Revisamos cada detalle antes de imprimir.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📦</div>
            <h3>Empaque para Regalo</h3>
            <p>Todos los productos incluyen empaque listo para regalar. Sin costo extra.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚚</div>
            <h3>Entrega Rápida</h3>
            <p>1 a 5 días hábiles según cantidad. Entrega a domicilio o recoje en taller.</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Tienes alguna idea en mente?</h2>
          <p>Contáctanos y la convertimos en realidad</p>
          <Link to="/contact" className="btn-hero-primary">Hablar por WhatsApp</Link>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="about-preview">
        <div className="about-content">
          <span className="about-label">Nuestra historia</span>
          <h2>Más que un negocio, una familia</h2>
          <p>
            Vitela's nació en Aguascalientes, México, como un sueño familiar. 
            Cada producto lleva nuestra dedicación y pasión por crear algo especial.
          </p>
          <Link to="/about" className="btn-link">Leer más →</Link>
        </div>
        <div className="about-image">
          <img src={logoVitelas} alt="Vitela's Logo" />
        </div>
      </section>
    </main>
  );
}

const categorias = [
  { name: 'Playeras', icon: '👕', desc: 'Personalizadas con DTF' },
  { name: 'Sudaderas', icon: '🧥', desc: 'Alta calidad y durabilidad' },
  { name: 'Tazas', icon: '☕', desc: 'Sublimación de colores vibrantes' },
  { name: 'Accesorios', icon: '🔑', desc: 'Llaveros y placas' },
];
