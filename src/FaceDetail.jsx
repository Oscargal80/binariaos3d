import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const FaceDetail = () => {
  const { text } = useParams();
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [ipInfo, setIpInfo] = useState({ ip: '', location: '', organization: '' });

  useEffect(() => {
    if (text === 'Proyectos') {
      axios.get('/api/ipinfo')
        .then(response => {
          setIpInfo(response.data);
        })
        .catch(error => console.error('Error fetching IP details:', error));
    }

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => navigate('/'), 1000);
    }, 9000);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setFadeOut(true);
        setTimeout(() => navigate('/'), 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, text]);

  const renderContent = () => {
    switch (text) {
      case 'Acerca':
        return (
          <p>
            Nos dedicamos al desarrollo de sitios web minimalistas y elegantes, sencillos pero robustos y totalmente adaptables a cualquier formato, con campos y tablas dinámicas. Nuestro compromiso es crecer con usted y su emprendimiento. Para saber más, comuníquese a <a href="mailto:info@binariaos.com.py">info@binariaos.com.py</a>.
          </p>
        );
      case 'Proyectos':
        return (
          <div>
            <p>
              Aquí puedes ver información sobre la IP y la localización:
            </p>
            <div style={{ textAlign: 'right', fontSize: '10px', background: 'rgba(255, 255, 255, 0.1)', fontFamily: "'JetBrains Mono', monospace" }}>
              ------DATA------<br />
              IP: {ipInfo.ip}<br />
              GPS: {ipInfo.location}<br />
              {ipInfo.organization}<br />
              BinariaOS@2024
            </div>
          </div>
        );
      case 'Trabajos':
        return (
          <div>
            <p>Explora algunos de nuestros proyectos más destacados:</p>
            <ul>
              <li><a href="https://cms.binariaos.com.py/">WordPress</a></li>
              <li><a href="https://shop.binariaos.com.py/">e-Commerce</a></li>
              <li><a href="https://binariaos.com.py/1980/">Vintage</a></li>
            </ul>
            <p>Además, puedes visitar nuestros proyectos en GitHub: <a href="https://github.com/Oscargal80">Oscargal80</a> y un interesante proyecto de terminal en <a href="https://ai.binariaos.com.py/">AI BinariaOS</a>.</p>
          </div>
        );
      case 'e-Comm':
        return (
          <p>
            Descubre nuestra solución de comercio electrónico con características avanzadas y personalizables. <a href="https://shop.binariaos.com.py">Visite nuestro sitio de ejemplo e-commerce</a> para ver nuestras capacidades en acción.
          </p>
        );
      case 'Clientes':
        return (
          <div>
            <p>binariaOS está comprometida con el éxito de nuestros clientes. Algunos de nuestros clientes destacados son:</p>
            <ul>
              <li><a href="https://expo.camaradeempresarioscde.org.py">Expo Cámara de Empresarios CDE</a></li>
              <li><a href="https://khairi.com.py">Khairi</a></li>
              <li><a href="https://rbb.com.py">RBB</a></li>
            </ul>
            <p>Estamos aquí para crecer juntos y adelantarnos al futuro.</p>
          </div>
        );
      case 'Contactos':
        return (
          <p>
            <a href="mailto:info@binariaos.com.py">info@binariaos.com.py</a><br />
            Asunción, Paraguay
          </p>
        );
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
