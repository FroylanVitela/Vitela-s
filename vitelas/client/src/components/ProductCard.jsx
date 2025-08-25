import { Link } from 'react-router-dom';
import { money } from '../utils/format';

const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360">
  <rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af" font-size="20" font-family="Arial">Sin imagen</text></svg>`);

export default function ProductCard({ productId, variant, productName }) {
  const img = variant?.image || variant?.media?.images?.[0] || placeholder;
  const href = `/product/${productId}?sku=${encodeURIComponent(variant?.sku || '')}`;

  // Precio de ejemplo: toma el primer tier
  const unit = variant?.priceTiers?.[0]?.price;

  return (
    <article className="card">
      <Link to={href} className="card-img">
        <img src={img} alt={variant?.name || productName} loading="lazy" />
      </Link>
      <div className="card-body">
        <h3 className="card-title" title={variant?.name || productName}>{variant?.name || productName}</h3>
        <p className="card-sub">{productName}</p>
        {unit ? <p className="card-price">desde {money(unit)}</p> : <p className="card-price">Personalizable</p>}
        <Link to={href} className="btn">Personalizar</Link>
      </div>
    </article>
  );
}