import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { HeroSlider } from '../components/HeroSlider';
import slider1 from '../assets/slider1.jpg';
import slider2 from '../assets/slider2.jpg';
import slider3 from '../assets/slider3.jpg';
import slider4 from '../assets/slider4.png';
import slider5 from '../assets/slider5.png';
import slider6 from '../assets/slider6.png';
import slider7 from '../assets/slider7.png';

/* Animación de aparición simple (sin librerías) */
function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          if (e.target.classList.contains('tiles')) {
            const tiles = e.target.querySelectorAll('.tile');
            tiles.forEach((tile, index) => { tile.style.transitionDelay = `${index * 0.1}s`; });
          }
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  useRevealOnScroll();

  return (
    <main className="home">
      <section className="hero hero--clean" data-reveal>
        <div className="hero-content">
          <h1>
            <span className="emoji" aria-hidden>🎁</span>{' '}
            <span className="title-fx">Somos el regalo</span>{' '}
            <span className="highlight">perfecto</span>{' '}
            <span className="title-fx">para toda ocasión.</span>
          </h1>

          <p>
            Tazas, botellas, vidrio, llaveros, playeras y sudaderas con tus
            diseños. Trabajamos con <strong>DTF</strong> <span aria-hidden>🖨️</span> y <strong>sublimación</strong> <span aria-hidden>🎨</span>
            para máxima durabilidad y color.
          </p>

          <div className="cta-row">
            <Link className="btn btn-pulse" to="/catalog">Explorar catálogo</Link>
            <Link className="btn btn-pulse" to="/size-guides">Guías de tallas</Link>
          </div>

          <ul className="trust">
            <li data-trust-item><span aria-hidden>⚙️ </span>DTF & Sublimación</li>
            <li data-trust-item><span aria-hidden>📦 </span>Mayoreo y menudeo</li>
            <li data-trust-item><span aria-hidden>💳 </span>Anticipo del 50%</li>
          </ul>
        </div>

        <div className="hero-visual">
          <HeroSlider
            images={[slider1, slider2, slider3,slider4,slider5,slider6,slider7]}
            interval={3500}
          />
        </div>
      </section>

      {/* MOSAICO de categorías (3 tiles) */}
      <section className="tiles" data-reveal>
        <article className="tile hover-float">
          <div className="icon floating">☕</div>
          <h3>Tazas & Drinkware</h3>
          <p>De la taza clásica a botellas y vasos térmicos, listos para sublimar.</p>
          <Link to="/catalog" className="link-cta slide-link">Ver artículos →</Link>
        </article>

        <article className="tile hover-float" style={{ transitionDelay: '0.1s' }}>
          <div className="icon floating" style={{ animationDelay: '0.3s' }}>👕</div>
          <h3>Ropa personalizada</h3>
          <p>Playeras y sudaderas en DTF. Guías de talla y paquetes por cantidad.</p>
          <Link to="/catalog" className="link-cta slide-link">Ver prendas →</Link>
        </article>

        <article className="tile hover-float" style={{ transitionDelay: '0.2s' }}>
          <div className="icon floating" style={{ animationDelay: '0.6s' }}>🪙</div>
          <h3>Llaveros & Placas</h3>
          <p>Acero y acabados especiales para detalles que duran.</p>
          <Link to="/catalog" className="link-cta slide-link">Ver accesorios →</Link>
        </article>
      </section>

      {/* Nuestra historia */}
      <section className="brand-grid" data-reveal>
        <article className="panel panel-scale">
          <h2 className="panel-title">
            <span aria-hidden>🐂 </span>
            Nuestra historia
          </h2>
          <p>
            <strong>Vitela&apos;s</strong> es un negocio familiar nacido en <strong>Aguascalientes, México</strong>.
            Creamos artículos personalizados con dedicación y calidad para convertirlos en el regalo perfecto.
          </p>
          <p>
            Cada diseño lleva nuestro esfuerzo diario y pasión por lo que hacemos. Trabajamos con la misma
            ilusión con la que esperamos que disfrutes cada producto.
          </p>
          <div className="signature">
            <span>Atentamente,</span>
            <strong>Familia Vitela</strong>
          </div>
          <div className="note">
            📲 Pedidos por WhatsApp en <Link to="/contact" className="slide-link">Contacto</Link>
          </div>
        </article>

        {/* Proceso de compra */}
        <article className="panel panel-scale">
          <h2 className="panel-title"><span aria-hidden>🛒 </span>Proceso de compra</h2>
          <ul className="steps">
            <li data-step="1"><span aria-hidden>📲 </span>Contáctanos por WhatsApp</li>
            <li data-step="2"><span aria-hidden>🎨 </span>Envía tu diseño + talla/artículo</li>
            <li data-step="3"><span aria-hidden>💻 </span>Revisas muestra digital</li>
            <li data-step="4"><span aria-hidden>💳 </span>50% anticipo para iniciar</li>
            <li data-step="5"><span aria-hidden>🚚 </span>Entrega a domicilio o recoges en taller</li>
          </ul>

          <div className="divider" />

          <h3 className="panel-subtitle"><span aria-hidden>⏱️ </span>Tiempos y condiciones</h3>
          <ul className="reasons">
            <li data-reason><span aria-hidden>📦 </span>Entrega: <strong>1 a 5 días</strong> según cantidad</li>
            <li data-reason><span aria-hidden>💰 </span>Anticipo 50% para cubrir materiales e iniciar producción</li>
            <li data-reason><span aria-hidden>🎁 </span>El resto se paga al recibir tu pedido</li>
            <li data-reason><span aria-hidden>📍 </span>Recoger en taller: <strong>sin costo</strong> | Domicilio: <strong>costo extra</strong></li>
          </ul>

          <p className="lead muted">
            ¿Por qué anticipo? Nos permite garantizar materiales de calidad y tu compromiso con el pedido. 🤝
          </p>
        </article>
      </section>

      {/* Servicios */}
      <section className="intro" data-reveal>
        <div className="intro-card hover-float">
          <h2><span aria-hidden>🛠️ </span>Nuestros servicios</h2>
          <p>
            Personalizamos artículos para regalo y uso diario con tecnología <strong>DTF</strong> y <strong>Sublimación</strong>.
            Trabajamos diseños propios o los tuyos, en <strong>mayoreo y menudeo</strong>.
          </p>
          <ul className="ticks">
            <li data-tick><span aria-hidden>☕ </span>Tazas, botellas, vasos térmicos, vidrio</li>
            <li data-tick><span aria-hidden>👕 </span>Playeras y sudaderas personalizadas</li>
            <li data-tick><span aria-hidden>🪙 </span>Llaveros y placas de acero</li>
            <li data-tick><span aria-hidden>💸 </span>Descuentos por volumen</li>
          </ul>
        </div>

        <div className="intro-card hover-float">
          <h2><span aria-hidden>💡 </span>Tu idea, nuestra misión</h2>
          <p className="muted">
            Convertimos tu diseño en realidad con acabados profesionales.
            Todo llega listo para regalar.
          </p>
          <ul className="ticks">
            <li data-tick><span aria-hidden>👀 </span>Revisión de arte digital antes de imprimir</li>
            <li data-tick><span aria-hidden>🎨 </span>Variedad de colores y materiales</li>
            <li data-tick><span aria-hidden>⚙️ </span>Tecnología DTF y sublimación</li>
            <li data-tick><span aria-hidden>📦 </span>Empaque incluido</li>
          </ul>
        </div>
      </section>
    </main>
  );
}