import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Configura la fecha objetivo (30 días desde ahora)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const updateCountdown = () => {
      const now = new Date();
      const difference = launchDate - now;
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Actualizar contador cada segundo
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial

    return () => clearInterval(timer);
  }, []);

  const handleNotify = () => {
    alert('¡Te notificaremos cuando esté listo! Mientras tanto, síguenos en nuestras redes sociales.');
  };

  return (
    <div style={styles.body}>
      {/* Elementos decorativos de fondo */}
      <div style={styles.shape1}></div>
      <div style={styles.shape2}></div>
      <div style={styles.shape3}></div>
      <div style={styles.shape4}></div>
      <div style={styles.circleGrid}></div>
      
      {/* Contenido principal */}
      <div style={styles.container}>
        <h1 style={styles.title}>PROXIMAMENTE</h1>
        <center><p style={styles.subtitle}>Estamos trabajando en algo increíble. ¡Muy pronto tendrás noticias nuestras!</p></center>
        
        <div style={styles.countdown}>
          <div style={styles.countdownItem}>
            <span style={styles.countdownNumber}>{timeLeft.days.toString().padStart(2, '0')}</span>
            <span style={styles.countdownLabel}>Días</span>
          </div>
          <div style={styles.countdownItem}>
            <span style={styles.countdownNumber}>{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span style={styles.countdownLabel}>Horas</span>
          </div>
          <div style={styles.countdownItem}>
            <span style={styles.countdownNumber}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span style={styles.countdownLabel}>Minutos</span>
          </div>
          <div style={styles.countdownItem}>
            <span style={styles.countdownNumber}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span style={styles.countdownLabel}>Segundos</span>
          </div>
        </div>
        
        <button style={styles.notifyBtn} onClick={handleNotify}>Notificarme</button>
      </div>
    </div>
  );
};

// Estilos en JavaScript
const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  container: {
    textAlign: 'center',
    zIndex: 10,
    position: 'relative',
    padding: '2rem',
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    animation: 'container-appear 1s ease-out forwards',
    maxWidth: '90%',
  },
  title: {
    fontSize: '6rem',
    fontWeight: 900,
    marginBottom: '1rem',
    color: '#e11d48',
    textShadow: '0 0 20px rgba(225, 29, 72, 0.7)',
    letterSpacing: '4px',
    animation: 'text-pulse 2s infinite alternate',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    opacity: 0.9,
  },
  countdown: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    margin: '2rem 0',
    flexWrap: 'wrap',
  },
  countdownItem: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(225, 29, 72, 0.1)',
    padding: '1rem',
    borderRadius: '10px',
    minWidth: '80px',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(225, 29, 72, 0.3)',
  },
  countdownNumber: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#e11d48',
  },
  countdownLabel: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  notifyBtn: {
    background: '#e11d48',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 600,
    marginTop: '1rem',
    boxShadow: '0 5px 15px rgba(225, 29, 72, 0.4)',
  },
  // Elementos decorativos de fondo
  shape1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, #e11d48 0%, transparent 70%)',
    top: '10%',
    left: '5%',
    borderRadius: '50%',
    opacity: 0.5,
    zIndex: 1,
    animation: 'float 15s infinite ease-in-out',
  },
  shape2: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    background: 'linear-gradient(45deg, #e11d48, #fb7185)',
    bottom: '15%',
    right: '10%',
    borderRadius: '50%',
    opacity: 0.5,
    zIndex: 1,
    animation: 'float 12s infinite ease-in-out reverse',
  },
  shape3: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    background: 'rgba(225, 29, 72, 0.4)',
    top: '40%',
    right: '20%',
    borderRadius: '50%',
    opacity: 0.5,
    zIndex: 1,
    animation: 'pulse 8s infinite alternate',
  },
  shape4: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    background: 'rgba(225, 29, 72, 0.3)',
    bottom: '30%',
    left: '15%',
    borderRadius: '50%',
    opacity: 0.5,
    zIndex: 1,
    animation: 'pulse 10s infinite alternate-reverse',
  },
  circleGrid: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    backgroundImage: 'radial-gradient(#e11d48 2px, transparent 2px)',
    backgroundSize: '30px 30px',
    opacity: 0.1,
    bottom: '-100px',
    right: '-100px',
    animation: 'rotate 30s linear infinite',
  },
};

// Añadir los keyframes de animación al documento
const addKeyframes = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes text-pulse {
      0% {
        text-shadow: 0 0 20px rgba(225, 29, 72, 0.7);
        transform: scale(1);
      }
      100% {
        text-shadow: 0 0 40px rgba(225, 29, 72, 0.9);
        transform: scale(1.03);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(5deg);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 0.5;
      }
      100% {
        transform: scale(1.2);
        opacity: 0.3;
      }
    }
    
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes container-appear {
      0% {
        opacity: 0;
        transform: translateY(50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .title {
        font-size: 4rem !important;
      }
      
      .subtitle {
        font-size: 1.2rem !important;
      }
      
      .countdown {
        gap: 1rem !important;
      }
      
      .countdown-item {
        min-width: 60px !important;
        padding: 0.8rem !important;
      }
      
      .countdown-number {
        font-size: 2rem !important;
      }
      
      .shape1, .shape2, .shape3, .shape4 {
        display: none !important;
      }
    }
    
    @media (max-width: 480px) {
      .title {
        font-size: 3rem !important;
      }
    }
  `;
  document.head.appendChild(style);
};

// Llamar a la función para añadir los keyframes cuando el componente se monte
if (typeof document !== 'undefined') {
  addKeyframes();
}

export default ComingSoon;