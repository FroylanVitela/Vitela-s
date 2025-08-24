import ProductCard from '../components/ProductCard.jsx';
import './Catalog.css';

const products = [
  {
    image: 'https://via.placeholder.com/300x250?text=Playera',
    title: 'Playeras Personalizadas',
    description: 'Elige entre una variedad de colores y diseños únicos.'
  },
  {
    image: 'https://via.placeholder.com/300x250?text=Sudadera',
    title: 'Sudaderas Personalizadas',
    description: 'Confort y estilo en una variedad de colores.'
  },
  {
    image: 'https://via.placeholder.com/300x250?text=Taza',
    title: 'Tazas Personalizadas',
    description: 'Perfectas para tus bebidas favoritas, con diseños a tu gusto.'
  },
  {
    image: 'https://via.placeholder.com/300x250?text=Llavero',
    title: 'Llaveros Personalizados',
    description: 'Lleva tus diseños favoritos siempre contigo.'
  }
];

export default function Catalog() {
  return (
    <section className="catalog-page">
      <h2>Catálogo de Productos</h2>
      <div className="productos">
        {products.map((p) => (
          <ProductCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}