import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Asegúrate de que se importe el CSS
import Cube from './Cube';
import FaceDetail from './FaceDetail';
import binariaLogo from './assets/BINARIA.png';
import Footer from './Footer'; // Importa el componente Footer

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <Link to="/">
            <img src={binariaLogo} alt="BinariaOS" className="binaria-logo" /> {/* Aplicar la clase CSS */}
          </Link>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Cube />} />
            <Route path="/face/:text" element={<FaceDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
