import { useState, useEffect } from 'react';
import './HeroSlider.css';

const images = [
  'https://source.unsplash.com/random/1000x500?mug',
  'https://source.unsplash.com/random/1000x500?bottle',
  'https://source.unsplash.com/random/1000x500?tshirt'
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const prev = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  const next = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <section id="bienvenida" className="slider">
      <div className="slides">
        {images.map((src, index) => (
          <div key={src} className={`slide ${index === current ? 'active' : ''}`}>
            <img src={src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button className="prev" onClick={prev}>⟨</button>
        <button className="next" onClick={next}>⟩</button>
      </div>
      <div className="bienvenida-content">
        <h2 className="bienvenida-titulo">Bienvenidos a Vitela's</h2>
        <p className="bienvenida-descripcion">Personalizamos tus momentos especiales con artículos únicos.</p>
      </div>
    </section>
  );
}