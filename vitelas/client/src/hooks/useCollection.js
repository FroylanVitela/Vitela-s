import { useEffect, useState } from 'react';
import { getCollection } from '../lib/api'; // ejemplo

export function useCollection(endpoint, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const res = await getCollection(endpoint, params);
        if (alive) setData(res);
      } catch (e) {
        if (alive) setErr(e.message || 'Error');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, err };
}