import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const FaceDetail = () => {
  const { text } = useParams();
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => navigate('/'), 1000); // Espera el tiempo de la animación fade-out antes de navegar
    }, 9000); // Inicia fade-out después de 9 segundos

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setFadeOut(true);
        setTimeout(() => navigate('/'), 1000); // Espera el tiempo de la animación fade-out antes de navegar
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const renderContent = () => {
    switch (text) {
      case 'Acerca':
        return <p>Nos dedicamos al desarrollo de sitios web minimalistas y elegantes, sencillos pero robustos y totalmente adaptables a cualquier formato, con campos y tablas dinámicas. Nuestro compromiso es crecer con usted y su emprendimiento. Para saber más, comuníquese a info@binariaos.com.py</p>;
      case 'BinOS':
        return <p>Detalles sobre BinOS...</p>;
      case 'Trabajos':
        return <p>Proyectos y trabajos realizados...</p>;
      case 'Clientes':
        return <p>binariaOS está comprometida con el éxito. Estamos para crecer juntos y adelantar el futuro.</p>;
      case 'e-Comm':
        return <p>Detalles sobre e-Comm...</p>;
      case 'Contactos':
        return <p>Números de contacto y enlaces...</p>;
      default:
        return <p>Contenido no encontrado.</p>;
    }
  };

  return (
    <div className={fadeOut ? 'fade-out' : 'fade-in'}>
      <h3>{text}</h3>
      {renderContent()}
    </div>
  );
};

export default FaceDetail;
