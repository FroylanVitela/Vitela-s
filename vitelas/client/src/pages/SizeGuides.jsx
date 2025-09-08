

import caballeroImg from '../assets/caballero.png';
import damaImg from '../assets/dama.png';
import ninoImg from '../assets/niño.png';
import sudaderaCapuchaImg from '../assets/sudaderaCapucha.png';
import sudaderaLisaImg from '../assets/sudaderaLisa.png';
import { useState } from 'react';

const GUIDES = [
  { slug:'playera-caballero', title:'Playeras • Caballero', img:caballeroImg },
  { slug:'playera-dama',      title:'Playeras • Dama',      img:damaImg },
  { slug:'playera-nino',      title:'Playeras • Niño',      img:ninoImg },
  { slug:'sudadera-capucha',  title:'Sudaderas con capucha y cangurera (unisex)', img:sudaderaCapuchaImg },
  { slug:'sudadera-lisa',     title:'Sudaderas lisas (unisex)', img:sudaderaLisaImg },
];

export default function SizeGuidesPage(){
  const [modalImg, setModalImg] = useState(null);
  const [modalAlt, setModalAlt] = useState('');
  const openModal = (img, alt) => { setModalImg(img); setModalAlt(alt); };
  const closeModal = () => setModalImg(null);
  return (
    <main className="size-guides-page">
      <h1>Guías de tallas</h1>
      <p className="muted" style={{margin:'0 0 1rem'}}>
        Consulta las medidas de cada prenda.
      </p>
      <div className="guides-grid">
        {GUIDES.map(g => (
          <article className="guide-card hover-float" key={g.slug}>
            <h3 style={{marginTop:0}}>{g.title}</h3>
            <img
              src={g.img}
              alt={g.title}
              style={{borderRadius:'8px', width:'100%', height:'auto', cursor:'zoom-in'}}
              onClick={() => openModal(g.img, g.title)}
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openModal(g.img, g.title)}
              aria-label={`Ampliar imagen de ${g.title}`}
            />
          </article>
        ))}
      </div>
      {modalImg && (
        <div className="guide-img-modal-overlay" onClick={closeModal} tabIndex={-1}>
          <img
            src={modalImg}
            alt={modalAlt}
            className="guide-img-modal-img"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
