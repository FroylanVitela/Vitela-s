import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoRed from '../assets/vitela-logo-red.png';

/* Íconos Lucide en SVG (puedes ajustar el stroke/color con CSS) */
function IcoHome(p){
  return (
    <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  );
}
function IcoCatalog(p){
  return (
    <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11"/>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"/>
      <path d="M6 13h12"/>
      <path d="M6 17h12"/>
    </svg>
  );
}
function IcoSize(p){
  return (
    <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  );
}
function IcoComingsoon(p){
  return (
    <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
    </svg>
  );
}
function IcoContact(p){
  return (
    <svg {...p} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/>
    </svg>
  );
}

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  // navbar rojo al hacer scroll (mantiene tu diseño)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [open]);

  // cerrar con Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // calcular altura real del navbar y exponerla como --nav-h
  useLayoutEffect(() => {
    const setVar = () => {
      const h = headerRef.current?.offsetHeight || 96;
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener('resize', setVar);
    return () => { ro.disconnect(); window.removeEventListener('resize', setVar); };
  }, []);

  return (
    <header ref={headerRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-strip" />
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="Inicio">
          <img src={logoRed} alt="Vitela’s" />
        </Link>

        {/* Navegación escritorio */}
        <nav className="nav-links" aria-label="Principal">
          <NavLink to="/" className="nav-link"><IcoHome className="nav-ico" /> Inicio</NavLink>
          <NavLink to="/catalog" className="nav-link"><IcoCatalog className="nav-ico" /> Catálogo</NavLink>
          <NavLink to="/size-guides" className="nav-link"><IcoSize className="nav-ico" /> Guías de tallas</NavLink>
          <NavLink to="/design-studio" className="nav-link"><IcoComingsoon className="nav-ico" />Diseña tu producto</NavLink>
          <NavLink to="/contact" className="nav-link"><IcoContact className="nav-ico" /> Contacto</NavLink>
        </nav>

        {/* Botón hamburguesa (móvil) */}
        <button
          className={`hamburger ${open ? 'active' : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="drawer"
          onClick={() => setOpen(v => !v)}
        >
          {open ? (
            /* Ícono cerrar (X) */
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden focusable="false">
              <circle cx="16" cy="16" r="15" fill="#fff" stroke="#e11d48" strokeWidth="2" />
              <line x1="10" y1="10" x2="22" y2="22" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="10" x2="10" y2="22" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            /* Ícono menú */
            <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden focusable="false">
              <circle cx="16" cy="16" r="15" fill="#fff" stroke="#e11d48" strokeWidth="2" />
              <rect x="9" y="12" width="14" height="2.5" rx="1.2" fill="#e11d48" />
              <rect x="9" y="17.5" width="14" height="2.5" rx="1.2" fill="#e11d48" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay + drawer móvil (sigue debajo del header fijo gracias al padding-top) */}
      <div
        className={`mobile-menu ${open ? 'show' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <nav id="drawer" className="drawer" onClick={e => e.stopPropagation()} aria-label="Menú móvil">
          <NavLink to="/" className="m-link" onClick={() => setOpen(false)}>Inicio</NavLink>
          <NavLink to="/catalog" className="m-link" onClick={() => setOpen(false)}>Catálogo</NavLink>
          <NavLink to="/size-guides" className="m-link" onClick={() => setOpen(false)}>Guías de tallas</NavLink>
          <NavLink to="/design-studio" className="m-link" onClick={() => setOpen(false)}>Diseña tu producto</NavLink>
          <NavLink to="/contact" className="m-link" onClick={() => setOpen(false)}>Contacto</NavLink>
        </nav>
      </div>
    </header>
  );
}
