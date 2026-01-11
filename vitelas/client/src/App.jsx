import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import SizeGuides from './pages/SizeGuides';
import Contact from './pages/Contact';
import DesignStudio from './pages/DesignStudio';
import './theme.css';
import './App.css';
import Navbar from './components/NavBar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/size-guides" element={<SizeGuides />} />
        <Route path="/design-studio" element={<DesignStudio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Vitela’s · Personaliza tu mundo · Todos los derechos reservados.</span>
      </footer>
    </BrowserRouter>
  );
}
