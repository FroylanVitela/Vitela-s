import { useMemo } from 'react';

export default function Filters({ data, value, onChange }) {
  // data: array de productos completos { category, materials[], variants[] ... }
  const options = useMemo(() => {
    const cat = new Set();
    const mat = new Set();
    const fin = new Set();
    for (const p of data) {
      if (p.category) cat.add(p.category);
      (p.materials || []).forEach(m => mat.add(m));
      (p.variants || []).forEach(v => {
        const f = v?.attributes?.finish;
        const fo = v?.attributes?.finishOptions;
        if (f) fin.add(f);
        if (Array.isArray(fo)) fo.forEach(x => fin.add(x));
      });
    }
    return {
      categories: Array.from(cat).sort(),
      materials: Array.from(mat).sort(),
      finishes: Array.from(fin).sort()
    };
  }, [data]);

  return (
    <aside className="filters">
      <div className="f-block">
        <label>Buscar</label>
        <input
          value={value.q || ''}
          onChange={e => onChange({ q: e.target.value })}
          placeholder="Taza, botella, sudadera…"
        />
      </div>

      <div className="f-block">
        <label>Categoría</label>
        <select value={value.category || ''} onChange={e => onChange({ category: e.target.value })}>
          <option value="">Todas</option>
          {options.categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="f-block">
        <label>Material</label>
        <select value={value.material || ''} onChange={e => onChange({ material: e.target.value })}>
          <option value="">Todos</option>
          {options.materials.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="f-block">
        <label>Acabado</label>
        <select value={value.finish || ''} onChange={e => onChange({ finish: e.target.value })}>
          <option value="">Todos</option>
          {options.finishes.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
    </aside>
  );
}