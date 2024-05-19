import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Asegúrate de que se importe el CSS
import Cube from './Cube';
import FaceDetail from './FaceDetail';
import binariaLogo from './assets/BINARIA.png';
import Footer from './Footer'; // Importa el componente Footer

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <div style={{ paddingBottom: '2.5rem' }}> {/* Espacio para el footer */}
          <img src={binariaLogo} alt="BinariaOS" className="binaria-logo" /> {/* Aplicar la clase CSS */}
          <Routes>
            <Route path="/" element={<Cube />} />
            <Route path="/face/:text" element={<FaceDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
