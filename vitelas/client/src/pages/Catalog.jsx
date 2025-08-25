import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import useQueryParams from '../hooks/useQueryParams';

export default function Catalog() {
  const { get, set, getAll } = useQueryParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [data, setData] = useState([]);

  // Estado desde URL
  const state = {
    q: get('q', ''),
    category: get('category', ''),
    material: get('material', ''),
    finish: get('finish', ''),
    page: Number(get('page', '1'))
  };

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setErr('');
      try {
        // Primero intentamos server-side (si tu controlador acepta filtros)
        const res = await api.get('/products', { params: { ...getAll(), limit: 200 } });
        const items = res.data.items || res.data || [];
        if (!cancelled) setData(items);
      } catch (e) {
        // Fallback: intenta sin params
        try {
          const res2 = await api.get('/products');
          const items2 = res2.data.items || res2.data || [];
          if (!cancelled) setData(items2);
        } catch (e2) {
          if (!cancelled) setErr('No se pudo cargar el catálogo.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [getAll]); // refetch si cambian params

  // Aplana variantes en tarjetas
  const allCards = useMemo(() => {
    const cards = [];
    for (const p of data) {
      for (const v of (p.variants || [])) {
        cards.push({ productId: p._id || p.id, variant: v, productName: p.name, category: p.category, materials: p.materials });
      }
    }
    return cards;
  }, [data]);

  // Filtros en cliente (por si el server no filtra)
  const filtered = useMemo(() => {
    const q = state.q.trim().toLowerCase();
    return allCards.filter(c => {
      if (state.category && c.category !== state.category) return false;
      if (state.material && !(c.materials || []).includes(state.material)) return false;
      if (state.finish) {
        const f = c.variant?.attributes?.finish;
        const fo = c.variant?.attributes?.finishOptions;
        const ok = (f && f === state.finish) || (Array.isArray(fo) && fo.includes(state.finish));
        if (!ok) return false;
      }
      if (q) {
        const hay = (c.variant?.name || '').toLowerCase().includes(q) ||
                    (c.productName || '').toLowerCase().includes(q);
        if (!hay) return false;
      }
      return true;
    });
  }, [allCards, state]);

  // Paginación en cliente
  const pageSize = 24;
  const pages = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const page = Math.min(Math.max(state.page, 1), pages);
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  const onFilters = (next) => set({ ...state, page: 1, ...next });
  const onPage = (p) => set({ ...state, page: p });

  return (
    <main className="catalog">
      <h1>Catálogo</h1>
      <div className="catalog-grid">
        <Filters data={data} value={state} onChange={onFilters} />
        <section className="cards">
          {loading && <div className="status">Cargando…</div>}
          {err && <div className="status error">{err}</div>}
          {!loading && !err && slice.length === 0 && <div className="status">Sin resultados</div>}

          <div className="grid">
            {slice.map(({ productId, variant, productName }) => (
              <ProductCard key={variant.sku || variant.name} productId={productId} variant={variant} productName={productName} />
            ))}
          </div>

          <Pagination page={page} pages={pages} onPage={onPage} />
        </section>
      </div>
    </main>
  );
}