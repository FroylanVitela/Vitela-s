import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { HeroSlider } from '../components/HeroSlider';
import logoVitelas from '../assets/vitela-logo-red.png';
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

const vertShader = `
precision mediump float;
varying vec2 vUv;
attribute vec2 a_position;
void main() {
    vUv = a_position;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragShader = `
precision mediump float;
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float u_progress;
uniform float u_time;
uniform sampler2D u_text;
float rand(vec2 n) {
    return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 n) {
    const vec2 d = vec2(0., 1.);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}
float fbm(vec2 n) {
    float total = 0.0, amplitude = .4;
    for (int i = 0; i < 4; i++) {
        total += noise(n) * amplitude;
        n += n;
        amplitude *= 0.6;
    }
    return total;
}
void main() {
    vec2 uv = vUv;
    uv.x *= min(1., u_resolution.x / u_resolution.y);
    uv.y *= min(1., u_resolution.y / u_resolution.x);
    vec2 screenUv = vUv * 0.5 + 0.5;
    screenUv.y = 1.0 - screenUv.y;
    float t = u_progress;
    vec4 textColor = texture2D(u_text, screenUv);
    vec3 color = textColor.rgb;
    float main_noise = 1. - fbm(.75 * uv + 10. - vec2(.3, .9 * t));
    float paper_darkness = smoothstep(main_noise - .1, main_noise, t);
    color -= vec3(.99, .95, .99) * paper_darkness;
    vec3 fire_color = fbm(6. * uv - vec2(0., .005 * u_time)) * vec3(6., 1.4, .0);
    float show_fire = smoothstep(.4, .9, fbm(10. * uv + 2. - vec2(0., .005 * u_time)));
    show_fire += smoothstep(.7, .8, fbm(.5 * uv + 5. - vec2(0., .001 * u_time)));
    float fire_border = .02 * show_fire;
    float fire_edge = smoothstep(main_noise - fire_border, main_noise - .5 * fire_border, t);
    fire_edge *= (1. - smoothstep(main_noise - .5 * fire_border, main_noise, t));
    color += fire_color * fire_edge;
    float opacity = 1. - smoothstep(main_noise - .0005, main_noise, t);
    gl_FragColor = vec4(color, opacity);
}
`;

export default function Home() {
  useRevealOnScroll();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    let startTime = performance.now();
    let animationProgress = 0.3;
    let uniforms;
    let textTexture;

    function createTextTexture(gl) {
      const logoCanvas = document.createElement("canvas");
      const logoCtx = logoCanvas.getContext("2d");
      
      const logoImg = new Image();
      logoImg.onload = () => {
        logoCanvas.width = 2048;
        logoCanvas.height = 1024;
        logoCtx.fillStyle = "white";
        logoCtx.fillRect(0, 0, logoCanvas.width, logoCanvas.height);
        
        // Dibujar el logo centrado
        const logWidth = 600;
        const logHeight = (logoImg.height / logoImg.width) * logWidth;
        const x = (logoCanvas.width - logWidth) / 2;
        const y = (logoCanvas.height - logHeight) / 2;
        logoCtx.drawImage(logoImg, x, y, logWidth, logHeight);
        
        textTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, logoCanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      };
      logoImg.src = logoVitelas;
    }

    function initShader() {
      const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");
      if (!gl) {
        console.error("WebGL is not supported by your browser.");
        return null;
      }

      function createShader(gl, sourceCode, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vertexShader = createShader(gl, vertShader, gl.VERTEX_SHADER);
      const fragmentShader = createShader(gl, fragShader, gl.FRAGMENT_SHADER);

      function createShaderProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
          return null;
        }
        return program;
      }

      const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
      uniforms = getUniforms(shaderProgram);

      function getUniforms(program) {
        const uniforms = {};
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          const uniformName = gl.getActiveUniform(program, i).name;
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
      }

      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.useProgram(shaderProgram);
      const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      createTextTexture(gl);
      return gl;
    }

    const gl = initShader();
    if (!gl) return;

    function render() {
      const currentTime = performance.now();
      const elapsed = (currentTime - startTime) / 8000;
      if (elapsed <= 1) {
        animationProgress = 0.3 + 0.7 * easeInOut(elapsed);
      } else {
        canvasEl.style.display = "none";
        return;
      }
      gl.uniform1f(uniforms.u_time, currentTime);
      gl.uniform1f(uniforms.u_progress, animationProgress);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textTexture);
      gl.uniform1i(uniforms.u_text, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    }

    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function resizeCanvas() {
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      gl.uniform2f(uniforms.u_resolution, canvasEl.width, canvasEl.height);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <main className="home">
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10
        }}
      ></canvas>
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