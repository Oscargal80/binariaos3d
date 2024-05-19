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
  const bienvenidoAudioRef = useRef(null);
  const [isWelcomePlayed, setIsWelcomePlayed] = useState(false);

  useEffect(() => {
    // Inicializar sonido de bienvenida
    bienvenidoAudioRef.current = new Audio(soundBienvenido);

    // Inicializar sonido de fondo con volumen bajo
    fondoAudioRef.current = new Audio(soundFondo);
    fondoAudioRef.current.volume = 0.1; // Ajusta el volumen aquí
    fondoAudioRef.current.loop = true; // Hace que el audio se repita

    return () => {
      // Limpiar los audios al desmontar el componente
      bienvenidoAudioRef.current.pause();
      bienvenidoAudioRef.current.currentTime = 0;
      fondoAudioRef.current.pause();
      fondoAudioRef.current.currentTime = 0;
    };
  }, []);

  const playWelcomeAudio = () => {
    if (!isWelcomePlayed) {
      bienvenidoAudioRef.current.play().catch(error => {
        console.log('Error al reproducir sonido de bienvenida:', error);
      });
      setIsWelcomePlayed(true);
    }
  };

  const toggleFondoAudio = () => {
    if (fondoAudioRef.current.paused) {
      fondoAudioRef.current.play().catch(error => {
        console.log('Error al reproducir sonido de fondo:', error);
      });
    } else {
      fondoAudioRef.current.pause();
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <Link to="/" onClick={playWelcomeAudio}>
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
