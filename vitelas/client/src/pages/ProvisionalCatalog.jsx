import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Catalog.css';

export default function ProvisionalCatalog() {
  useEffect(() => {
    document.title = 'Catálogo - Vitela\'s';
  }, []);

  // El PDF público esperado
  const pdfPath = '/catalog.pdf';
  const [pdfExists, setPdfExists] = useState(null);

  useEffect(() => {
    let mounted = true;
    // Verificar si el PDF público está disponible
    fetch(pdfPath, { method: 'HEAD' })
      .then(res => {
        if (mounted) setPdfExists(res.ok);
      })
      .catch(() => {
        if (mounted) setPdfExists(false);
      });
    return () => { mounted = false; };
  }, []);

  // Ruta detectada en el repo: si tu PDF está en /docs, este es el archivo encontrado
  const repoDocsPath = "/docs/Catalogo Vitela's 2025.pdf";

return (
    <>
      <div style={{padding:'1rem',textAlign:'center',fontSize:14,color:'#666',background:'#f9f9f9'}}>
        <a href={pdfPath} download style={{marginRight:16}}>⬇ Descargar catálogo</a>
        <Link to="/">← Volver al inicio</Link>
      </div>
      <div style={{position:'fixed',inset:0,zIndex:999}}>
        {pdfExists === true && (
          <iframe src={pdfPath} title="Catálogo PDF" style={{width:'100%',height:'100%',border:'none'}} />
        )}
        {pdfExists === false && (
          <div style={{padding:'2rem',textAlign:'center'}}>
            <p>No se encontró <strong>/catalog.pdf</strong> en el servidor.</p>
            <p>Coloca el PDF en <code>vitelas/client/public/catalog.pdf</code>.</p>
          </div>
        )}
        {pdfExists === null && <p style={{textAlign:'center',marginTop:'2rem'}}>Cargando catálogo…</p>}
      </div>
    </>
  );
}
