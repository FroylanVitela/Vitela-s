import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useQueryParams() {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const setParams = (next) => {
    const p = new URLSearchParams(search);
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) p.delete(k);
      else p.set(k, Array.isArray(v) ? v.join(',') : String(v));
    });
    navigate({ pathname, search: p.toString() }, { replace: true });
  };

  const getAll = () => Object.fromEntries(params.entries());
  const get = (k, def = '') => params.get(k) ?? def;

  return { params, get, getAll, set: setParams };
}
