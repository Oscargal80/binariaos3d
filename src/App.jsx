import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Asegúrate de que se importe el CSS
import Cube from './Cube';
import FaceDetail from './FaceDetail';
import binariaLogo from './assets/BINARIA.png';
import Footer from './Footer'; // Importa el componente Footer

// Importa los sonidos
import soundBienvenido from '../public/audio/bienvenido.mp3';
import soundFondo from '../public/audio/modern.mp3';

function App() {
  const [count, setCount] = useState(0);
  const fondoAudioRef = useRef(null);

  useEffect(() => {
    // Reproducir sonido de bienvenida al cargar el sitio después de un retraso de 3 segundos
    const bienvenidoAudio = new Audio(soundBienvenido);
    const bienvenidoTimeout = setTimeout(() => {
      bienvenidoAudio.play().catch(error => {
        console.log('Error al reproducir sonido de bienvenida:', error);
      });
    }, 3000);

    // Reproducir sonido de fondo con volumen bajo
    fondoAudioRef.current = new Audio(soundFondo);
    fondoAudioRef.current.volume = 0.1; // Ajusta el volumen aquí
    fondoAudioRef.current.loop = true; // Hace que el audio se repita
    fondoAudioRef.current.play().catch(error => {
      console.log('Error al reproducir sonido de fondo:', error);
    });

    return () => {
      // Limpiar los audios al desmontar el componente
      clearTimeout(bienvenidoTimeout);
      bienvenidoAudio.pause();
      bienvenidoAudio.currentTime = 0;
      fondoAudioRef.current.pause();
      fondoAudioRef.current.currentTime = 0;
    };
  }, []);

  const toggleFondoAudio = () => {
    if (fondoAudioRef.current.paused) {
      fondoAudioRef.current.play();
    } else {
      fondoAudioRef.current.pause();
    }
  };

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
        <Footer toggleFondoAudio={toggleFondoAudio} /> {/* Pasar la función al Footer */}
      </div>
    </Router>
  );
}

export default App;
