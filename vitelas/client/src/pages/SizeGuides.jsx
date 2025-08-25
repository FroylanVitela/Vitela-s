import { useEffect, useState } from 'react';
import api from '../services/api';

export default function SizeGuides() {
  const [list, setList] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true); setErr('');
      try {
        const res = await api.get('/size-guides');
        const items = res.data.items || res.data || [];
        if (!cancel) setList(items);
      } catch (e) {
        if (!cancel) setErr('No se pudieron cargar las guías.');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  return (
    <main className="sizes">
      <h1>Guías de tallas</h1>
      {loading && <div className="status">Cargando…</div>}
      {err && <div className="status error">{err}</div>}
      {!loading && !err && list.map(g => (
        <section key={g._id || g.key} className="size-block">
          <h2>{g.title || g.key}</h2>
          <table>
            <thead>
              <tr><th>Talla</th><th>Pecho (cm)</th><th>Largo (cm)</th></tr>
            </thead>
            <tbody>
              {(g.rows || []).map(r => (
                <tr key={r.size}><td>{r.size}</td><td>{r.chest ?? '-'}</td><td>{r.length ?? '-'}</td></tr>
              ))}
            </tbody>
          </table>
          {g.notes && <p className="notes">{g.notes}</p>}
        </section>
      ))}
    </main>
  );
}