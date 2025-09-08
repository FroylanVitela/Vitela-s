import { useMemo, useState } from 'react';
import { PRODUCTS, CATEGORIES, MATERIALS } from '../data/products';

const categories = [{key:'', name:'Todas'}, ...Object.values(CATEGORIES)];
const materials  = [{key:'', name:'Todos'}, ...MATERIALS];

function PriceTiers({ tiers }){
  return (
    <div className="card-sub" style={{marginTop:'.35rem'}}>
      {tiers.map(t => (
        <div key={t.label}>
          <strong>{t.label}:</strong> ${t.precio}
        </div>
      ))}
    </div>
  );
}

export default function Catalog(){
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [material, setMaterial] = useState('');
  const [modal, setModal] = useState(null); // {product}

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (category) list = list.filter(p => p.category === category);
    if (material) list = list.filter(p => p.material === material);
    if (q.trim()){
      const s = q.trim().toLowerCase();
      list = list.filter(p => (p.title.toLowerCase().includes(s) || p.slug.includes(s)));
    }
    return list;
  }, [q, category, material]);

  return (
    <main className="catalog">
      <h1>Catálogo</h1>

      <div className="catalog-grid">
        {/* Filtros (columna izquierda en desktop) */}
        <aside className="filters">
          <div className="f-block">
            <label>Buscar</label>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Taza, botella, sudadera..."
            />
          </div>

          <div className="f-block">
            <label>Categoría</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => <option key={c.key} value={c.key}>{c.name}</option>)}
            </select>
          </div>

          <div className="f-block">
            <label>Material</label>
            <select value={material} onChange={e => setMaterial(e.target.value)}>
              {materials.map(m => <option key={m.key} value={m.key}>{m.name}</option>)}
            </select>
          </div>

          <div className="note" style={{marginTop:'.75rem'}}>
            Todos los artículos se pueden personalizar con tu diseño.
          </div>
        </aside>

        {/* Cards */}
        <section className="cards">
          {!filtered.length && <div className="status">No hay artículos que coincidan.</div>}
          <div className="grid">
            {filtered.map(p => (
              <article className="card hover-float" key={p.slug}>
                <div className="card-img" style={{
                  backgroundImage:`url(/catalog/${p.slug}.jpg)`
                }} />
                <div className="card-body">
                  <h3 className="card-title">{p.title}</h3>
                  <div className="card-sub">
                    <em>{CATEGORIES[p.category]?.name}</em> · {MATERIALS.find(m=>m.key===p.material)?.name}
                  </div>
                  <PriceTiers tiers={p.priceTiers} />
                  <button className="card-btn" onClick={() => setModal(p)}>Ver más</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Modal de detalle */}
      {modal && (
        <div className="catalog-modal-overlay" onClick={() => setModal(null)}>
          <div className="catalog-modal" onClick={e => e.stopPropagation()}>
            <button className="catalog-modal-close" onClick={() => setModal(null)} aria-label="Cerrar">×</button>
            <img className="catalog-modal-img" src={`/catalog/${modal.slug}.jpg`} alt={modal.title} />
            <div className="catalog-modal-content">
              <div className="catalog-modal-title">{modal.title}</div>
              <div className="catalog-modal-sub">
                <em>{CATEGORIES[modal.category]?.name}</em> · {MATERIALS.find(m=>m.key===modal.material)?.name}
              </div>
              <div className="catalog-modal-prices">
                {modal.priceTiers.map(t => (
                  <div key={t.label}>{t.label}: <strong>${t.precio}</strong></div>
                ))}
              </div>
              {/* Aquí puedes agregar más información específica si existe, como descripción, detalles, etc. */}
              {modal.desc && <div className="catalog-modal-desc">{modal.desc}</div>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
