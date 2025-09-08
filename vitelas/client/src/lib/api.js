// client/src/lib/api.js
// Compatible con CRA (REACT_APP_*) y Vite (VITE_*). Exporta objeto y funciones nombradas.

const API_BASE_URL =
  // Vite
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL)) ||
  // CRA
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  // Fallback
  'http://localhost:5000/api';

function toQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    if (Array.isArray(v)) v.forEach((item) => q.append(k, item));
    else q.set(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : '';
}

async function http(path, { method = 'GET', headers, body, ...rest } = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    ...rest,
  };
  if (body !== undefined) opts.body = typeof body === 'string' ? body : JSON.stringify(body);

  const res = await fetch(url, opts);
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const msg = (isJson && data?.message) || res.statusText || 'Error de red';
    throw new Error(`[API ${res.status}] ${msg}`);
  }
  return data;
}

// === Funciones nombradas ===
export const getHealth = () => http('/health');

export const listProducts = (params) => http(`/products${toQuery(params)}`);
export const getProduct = (slugOrId) => http(`/products/${slugOrId}`);

export const getOptionSets = () => http('/option-sets');

export const getSizeGuides = () => http('/size-guides');

export const getGarmentPackages = () => http('/garment-packages');

export const getPolicies = () => http('/policies');

// === Objeto api (por si prefieres api.algo()) ===
export const api = {
  health: getHealth,
  listProducts,
  getProduct,
  optionSets: getOptionSets,
  sizeGuides: getSizeGuides,
  garmentPackages: getGarmentPackages,
  policies: getPolicies,
};

export default api;