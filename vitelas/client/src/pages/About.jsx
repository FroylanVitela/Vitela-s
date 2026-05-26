import { Link } from 'react-router-dom';
import logoVitelas from '../assets/vitela-logo-red.png';

export default function About() {
  return (
    <main className="about-page">
      {/* HEADER */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">Nuestra Historia</span>
          <h1>Vitela's: Regalos con alma</h1>
          <p className="about-subtitle">
            Un negocio familiar nacido en Aguascalientes, México, con la misión de 
            crear regalos personalizados que conectan momentos especiales.
          </p>
        </div>
        <div className="about-hero-visual">
          <img src={logoVitelas} alt="Vitela's Logo" />
        </div>
      </section>

      {/* NUESTRA HISTORIA */}
      <section className="about-section">
        <div className="about-section-grid">
          <div className="about-text">
            <h2>Cómo empezó todo</h2>
            <p>
              <strong>Vitela's</strong> nació de una idea simple: hacer que cada regalo sea especial. 
              Comenzamos en el corazón de Aguascalientes, con la convicción de que 
              los detalles pequeños hacen las diferencias más grandes.
            </p>
            <p>
              Lo que empezó como un pequeño taller hoy es un espacio donde cada 
              producto lleva horas de dedicación, creatividad y amor por el trabajo bien hecho.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Años de experiencia</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Clientes satisfechos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Productos entregados</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS DETALLADOS */}
      <section className="about-section alt-bg">
        <div className="about-section-content">
          <h2>¿A qué nos dedicamos?</h2>
          <p className="section-desc">
            Especializamos en personalización de productos mediante dos técnicas principales:
          </p>
          
          <div className="tech-cards">
            <div className="tech-card">
              <div className="tech-icon">🖨️</div>
              <h3>Impresión DTF</h3>
              <p>
                Direct to Film (DTF) ofrece durabilidad excepcional y colores vibrantes 
                en playeras y sudaderas. El diseño se transfiere directamente al textil 
                con resistencia a múltiples lavadas.
              </p>
              <ul>
                <li>✓ Colores vibrantes y precisos</li>
                <li>✓ Alta durabilidad</li>
                <li>✓ Compatible con cualquier color de tela</li>
                <li>✓ Suave al tacto</li>
              </ul>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon">🎨</div>
              <h3>Sublimación</h3>
              <p>
                La sublimación permite crear diseños full color en tazas, vasos, 
                bottles y accesorios. La tinta se fusiona con el recubrimiento 
                del producto para resultados que duran.
              </p>
              <ul>
                <li>✓ Diseños en toda la superficie</li>
                <li>✓ Colores que no se gastan</li>
                <li>✓ Ideal para fotografías e imágenes complejas</li>
                <li>✓ Acabado de alta calidad</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="about-section">
        <div className="about-section-content">
          <h2>Lo que creamos</h2>
          
          <div className="products-grid">
            <div className="product-item">
              <span className="product-icon">👕</span>
              <h3>Playeras</h3>
              <p>Camisetas personalizadas con técnica DTF. Disponible en múltiples colores y tallas.</p>
            </div>
            
            <div className="product-item">
              <span className="product-icon">🧥</span>
              <h3>Sudaderas</h3>
              <p>Sweatshirts y Hoodies con tu diseño. Ideales para eventos, familias y empresas.</p>
            </div>
            
            <div className="product-item">
              <span className="product-icon">☕</span>
              <h3>Tazas</h3>
              <p>Tazas sublimadas full color. El regalo perfecto para cualquier ocasión.</p>
            </div>
            
            <div className="product-item">
              <span className="product-icon">🍶</span>
              <h3>Botellas</h3>
              <p>Botellas térmicas y vasos sublimados. Mantienen tus bebidas a temperatura ideal.</p>
            </div>
            
            <div className="product-item">
              <span className="product-icon">🔑</span>
              <h3>Llaveros</h3>
              <p>Llaveros y placas de acero personalizados. Detalles que duran para siempre.</p>
            </div>
            
            <div className="product-item">
              <span className="product-icon">🎁</span>
              <h3>Kits Regalo</h3>
              <p>Paquetes personalizados parabodas, quinceañeras, eventos corporativos y más.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="about-section alt-bg">
        <div className="about-section-content">
          <h2>¿Cómo trabajamos?</h2>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Contáctanos</h3>
                <p>Escríbenos por WhatsApp con tu idea o diseño. Te orientamos sobre las mejores opciones.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Revisión del diseño</h3>
                <p>Te enviamos una muestra digital para que approves el diseño antes de producir.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Anticipo del 50%</h3>
                <p>Para confirmar el pedido y comenzar la producción. Aceptamos transferencia o pago en efectivo.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Producción</h3>
                <p>Tu pedido se fabrica con cuidado. Tiempo estimado: 1-5 días según cantidad.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">05</div>
              <div className="step-content">
                <h3>Entrega</h3>
                <p>Retira en taller sin costo o recibe en domicilio con envío adicional. Pagas el resto al recibir.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="about-section">
        <div className="about-section-content centered">
          <h2>Nuestra promesa</h2>
          
          <div className="values-grid">
            <div className="value-item">
              <span className="value-icon">❤️</span>
              <h3>Calidad</h3>
              <p>Cada producto pasa por un control de calidad riguroso antes de entregarse.</p>
            </div>
            
            <div className="value-item">
              <span className="value-icon">🎯</span>
              <h3>Comunicación</h3>
              <p>Te mantenemos informado en cada etapa del proceso. Respondemos rápido.</p>
            </div>
            
            <div className="value-item">
              <span className="value-icon">🤝</span>
              <h3>Confianza</h3>
              <p>Anticipo del 50% solo para cubrir materiales. El resto al recibir tu pedido.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="about-cta">
        <div className="about-cta-content">
          <h2>¿Listo para crear algo especial?</h2>
          <p>Estamos listos para hacer realidad tu idea. ¡Escríbenos!</p>
          <div className="about-cta-buttons">
            <Link to="/catalog" className="btn-cta-primary">Ver Catálogo</Link>
            <Link to="/contact" className="btn-cta-secondary">Contactar por WhatsApp</Link>
          </div>
        </div>
      </section>
    </main>
  );
}