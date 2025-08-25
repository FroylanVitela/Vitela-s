export default function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null;
  const prev = () => page > 1 && onPage(page - 1);
  const next = () => page < pages && onPage(page + 1);

  return (
    <nav className="pager">
      <button onClick={prev} disabled={page <= 1}>← Anterior</button>
      <span>Página {page} de {pages}</span>
      <button onClick={next} disabled={page >= pages}>Siguiente →</button>
    </nav>
  );
}