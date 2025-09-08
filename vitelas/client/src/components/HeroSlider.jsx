
import './HeroSlider.css';
import { useEffect, useRef, useState } from 'react';

export function HeroSlider({ images = [], interval = 4000 }){
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!images.length) return;
    timer.current = setInterval(() => {
      setIdx(i => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer.current);
  }, [images.length, interval]);

  return (
    <div className="hero-slider">
      {images.map((src, i) => (
        <div
          key={src}
          className={`hero-slide ${i === idx ? 'active' : ''}`}
          style={{ backgroundImage:`url(${src})` }}
          aria-hidden={i !== idx}
        />
      ))}
      <div className="hero-dots" role="tablist" aria-label="Cambiar imagen">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`dot ${i===idx?'active':''}`}
            aria-label={`Ir al slide ${i+1}`}
            aria-selected={i===idx}
          />
        ))}
      </div>
    </div>
  );
}
