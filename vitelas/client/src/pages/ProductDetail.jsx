import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { money } from '../utils/format';

export default function ProductDetail() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const sku = params.get('sku') || '';
  const [doc, setDoc] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true); setErr('');
      try {
        const res = await api.get(`/products/${id}`);
        if (!cancel) setDoc(res.data);
      } catch (e) {
        if (!cancel) setErr('No se pudo cargar el producto.');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [id]);

  const variant = useMemo(() => {
    if (!doc) return null;
    if (sku) return (doc.variants || []).find(v => v.sku === sku) || doc.variants?.[0];
    return doc.variants?.[0];
  }, [doc, sku]);

  const unit = useMemo(() => {
    if (!variant?.priceTiers) return null;
    // busca el primer tier como “desde”
    return variant.priceTiers[0]?.price ?? null;
  }, [variant]);

  const finishOptions = useMemo(() => variant?.attributes?.finishOptions || [], [variant]);

  const setSku = (nextSku) => setParams(prev => { prev.set('sku', nextSku); return prev; }, { replace: true });

  if (loading) return <main className="detail"><div className="status">Cargando…</div></main>;
  if (err || !doc) return <main className="detail"><div className="status error">{err || 'No encontrado'}</div></main>;

  return (
    <main className="detail">
      <div className="detail-head">
        <div className="media">
          <img src={variant?.image || variant?.media?.images?.[0]} alt={variant?.name || doc.name} onError={(e)=>{e.currentTarget.style.background='#f3f4f6'}}/>
        </div>
        <div className="meta">
          <h1>{variant?.name || doc.name}</h1>
          <p className="sub">{doc.name}</p>
          {unit && <p className="price">Desde {money(unit)}</p>}

          {finishOptions.length > 0 && (
            <div className="row">
              <label>Acabado</label>
              <div className="chips">
                {finishOptions.map(f => (
                  <span key={f} className="chip">{f}</span>
                ))}
              </div>
            </div>
          )}

          <div className="row">
            <label>Cantidad</label>
            <div className="qty">
              <button onClick={()=>setQty(q=>Math.max(1,q-1))}>-</button>
              <input value={qty} onChange={e=>setQty(Math.max(1, parseInt(e.target.value||'1',10)))} />
              <button onClick={()=>setQty(q=>q+1)}>+</button>
            </div>
          </div>

          <div className="row">
            <button className="btn">Añadir al carrito</button>
          </div>
        </div>
      </div>

      <section className="variants">
        <h2>Variantes</h2>
        <div className="chips">
          {(doc.variants || []).map(v => (
            <button
              key={v.sku || v.name}
              className={`chip ${v.sku === variant?.sku ? 'active' : ''}`}
              onClick={()=> setSku(v.sku)}
            >
              {v.name}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}