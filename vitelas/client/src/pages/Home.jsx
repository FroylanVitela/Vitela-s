import { Link } from 'react-router-dom';
import { useEffect } from 'react';

/* Animación de aparición simple (sin librerías) */
function useRevealOnScroll(){
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if(!('IntersectionObserver' in window)){ els.forEach(el => el.classList.add('is-visible')); return; }
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
            <Link className="btn btn-ghost" to="/size-guides">Guías de tallas</Link>
          </div>

          <ul className="trust">
            <li data-trust-item><span aria-hidden>⚙️ </span>DTF & Sublimación</li>
            <li data-trust-item><span aria-hidden>📦 </span>Mayoreo y menudeo</li>
            <li data-trust-item><span aria-hidden>💳 </span>Anticipo del 50%</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden>
          <div className="floating-products">
            <div className="floating-item" style={{ '--delay': '0s', '--x': '20px', '--y': '-10px' }}>☕</div>
            <div className="floating-item" style={{ '--delay': '1s', '--x': '-15px', '--y': '15px' }}>👕</div>
            <div className="floating-item" style={{ '--delay': '2s', '--x': '10px', '--y': '20px' }}>🔖</div>
          </div>
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
          <div className="icon floating" style={{ animationDelay: '0.6s' }}>🔖</div>
          <h3>Llaveros & Placas</h3>
          <p>Acero y acabados especiales para detalles que duran.</p>
          <Link to="/catalog" className="link-cta slide-link">Ver accesorios →</Link>
        </article>
      </section>

      {/* Nuestra razón de ser (texto 2.1) */}
      <section className="brand-grid" data-reveal>
        <article className="panel panel-scale">
          <h2 className="panel-title">
            <span aria-hidden>🐂 </span>
            Vitela&apos;s Gifts & Clothes
          </h2>
          <p>
            Es un negocio familiar dedicado a la venta de ropa de calidad, tazas y artículos diversos
            con diseños originales, de moda, populares o personalizados a precios asequibles, lo cual
            convierte a nuestra marca en el regalo ideal para toda ocasión.
          </p>
          <p>
            Para Vitela&apos;s Gifts & Clothes es un placer transmitir nuestro esfuerzo cotidiano y dedicación diaria
            en cada uno de nuestros artículos como un obsequio hacia nuestros clientes. Esperando que puedan
            disfrutar de nuestra marca con el mismo gusto que nosotros experimentamos al crearla.
          </p>
          <p>
            Nuestra marca nace en la ciudad de <strong>Aguascalientes, Ags. México</strong>.
            Contamos con servicio de <strong>mayoreo</strong> y <strong>menudeo</strong> en diseños propios o personalizados.
          </p>
          <div className="signature">
            <span>Atentamente,</span>
            <strong>Familia Vitela</strong>
          </div>
          <div className="note">
            Contacto directo y pedidos en la página <Link to="/contact" className="slide-link">Contacto</Link>.
          </div>
        </article>

        {/* Cómo comprar + Anticipo (texto 2.2) */}
        <article className="panel panel-scale">
          <h2 className="panel-title"><span aria-hidden>🛒 </span>¿Cómo comprar?</h2>
          <ul className="steps">
            <li data-step="1"><span aria-hidden>📲 </span>Somos tienda online. Escríbenos por WhatsApp (en <Link to="/contact" className="slide-link">Contacto</Link>).</li>
            <li data-step="2"><span aria-hidden>🧧 </span>Envíanos la imagen que te guste y dinos color y talla de tu prenda (o el artículo: taza, botella, etc.).</li>
            <li data-step="3"><span aria-hidden>💻 </span>Te elaboramos una muestra digital para revisar el resultado final.</li>
            <li data-step="4"><span aria-hidden>🚚 </span>Indícanos si prefieres entrega a domicilio (con costo extra) o recoger en taller (sin costo).</li>
          </ul>

          <div className="divider" />

          <h3 className="panel-subtitle"><span aria-hidden>💳 </span>¿Por qué solicitamos anticipo?</h3>
          <ul className="reasons">
            <li data-reason><span aria-hidden>⚠️ </span>En inicios cobrábamos al entregar, pero hubo pedidos fraudulentos (no recibían, no respondían o daban ubicaciones falsas).</li>
            <li data-reason><span aria-hidden>🧪 </span>El anticipo cubre materia prima y asegura el compromiso de ambas partes.</li>
            <li data-reason><span aria-hidden>5️⃣ </span>El trabajo inicia con <strong>50% de anticipo</strong>; el resto se liquida al entregar.</li>
            <li data-reason><span aria-hidden>🙏 </span>Clientes frecuentes: ¡gracias por su preferencia! Nuevos clientes: gracias por su comprensión.</li>
            <li data-reason><span aria-hidden>🤝 </span>Compromiso: atención y servicio de calidad para quien solicita nuestros artículos de forma honorable.</li>
          </ul>

          <p className="lead muted">
            Tiempo de entrega estimado: <strong>1 a 5 días</strong>, según carga de trabajo y cantidad de piezas.
          </p>
        </article>
      </section>

      {/* Intro (servicios) */}
      <section className="intro" data-reveal>
        <div className="intro-card hover-float">
          <h2><span aria-hidden>🛠️ </span>¿Qué hacemos?</h2>
          <p>
            Personalizamos artículos para regalo y uso diario: tazas de cerámica, botellas de aluminio,
            recipientes de acero, envases de vidrio, llaveros y placas; además de playeras y sudaderas.
            Producción bajo pedido para <strong>mayoreo</strong> y <strong>menudeo</strong>.
          </p>
          <ul className="ticks">
            <li data-tick><span aria-hidden>🖨️ </span>Impresión DTF (textil) y Sublimación (tazas/metal/vidrio)</li>
            <li data-tick><span aria-hidden>👀 </span>Arte revisado antes de producir</li>
            <li data-tick><span aria-hidden>💸 </span>Descuentos por cantidad</li>
          </ul>
        </div>

        <div className="intro-card hover-float">
          <h2><span aria-hidden>💡 </span>Queremos tu idea</h2>
          <p className="muted">
            Proponemos acabados, materiales y empaques para que tu regalo llegue &quot;listo para entregar&quot;.
          </p>
          <ul className="ticks">
            <li data-tick><span aria-hidden>🧪 </span>Pruebas de arte previas</li>
            <li data-tick><span aria-hidden>🎨 </span>Catálogo de colores y acabados</li>
            <li data-tick><span aria-hidden>⏱️ </span>Entrega puntual</li>
          </ul>
        </div>
      </section>
    </main>
  );
}