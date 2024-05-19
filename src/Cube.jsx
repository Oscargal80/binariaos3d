import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useNavigate } from 'react-router-dom';
import '@fontsource/jetbrains-mono'; // Importa la fuente JetBrains Mono
import Footer from './Footer'; // Importa el Footer

// Componente Face para representar cada cara del cubo
const Face = ({ position, rotation, onClick, animate, text }) => {
  // Configura la animación de la posición, escala y rotación usando useSpring
  const { pos, scale, rot } = useSpring({
    pos: animate ? [0, 0, 1.5] : position, // Ajuste de la posición de acercamiento
    scale: animate ? [5, 5, 5] : [1, 1, 1], // Ajuste de la escala para no acercar demasiado
    rot: animate ? [0, 0, 0] : rotation, // Rotación basada en la animación
    config: { duration: 2000, tension: 30, friction: 40 }, // Configuración de la animación
  });

  return (
    <a.mesh position={pos} rotation={rot} scale={scale} onClick={onClick}>
      <planeGeometry args={[2, 2]} /> // Geometría de plano de 2x2
      <meshPhysicalMaterial
        color="black"
        roughness={0.1} // Baja rugosidad para un acabado brillante
        metalness={0.9} // Alta metalicidad para reflejos espejados
        reflectivity={1} // Máxima reflectividad
        clearcoat={1} // Capa superior transparente para mayor brillo
        clearcoatRoughness={0} // Suavidad en la capa superior
      />
      <Edges color="white" /> // Bordes blancos para la geometría
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.2} // Ajuste del tamaño del texto
        color="white"
        font="/jetbrains-mono.woff" // Especifica la ruta a la fuente JetBrains Mono
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </a.mesh>
  );
};

// Componente principal para el cubo rotatorio
function RotatingCube() {
  const mesh = useRef(); // Referencia al grupo del cubo
  const [animate, setAnimate] = useState(Array(6).fill(false)); // Estado para controlar la animación de cada cara
  const [isAnimating, setIsAnimating] = useState(false); // Estado para controlar si el cubo está animando
  const [isDragging, setIsDragging] = useState(false); // Estado para controlar si el cubo está siendo arrastrado
  const [clickStart, setClickStart] = useState(null); // Estado para guardar el tiempo de inicio del clic
  const startPos = useRef({ x: 0, y: 0 }); // Referencia para la posición de inicio del clic
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Maneja el clic en una cara del cubo
  const handleClick = (index) => {
    const newAnimate = Array(6).fill(false);
    newAnimate[index] = true;
    setAnimate(newAnimate);
    setIsAnimating(true);
    setTimeout(() => {
      navigate(`/face/${faces[index].text}`); // Navega a una nueva ruta después de la animación
      setAnimate(Array(6).fill(false));
      setIsAnimating(false);
    }, 2000);
  };

  // Maneja el inicio del arrastre
  const handlePointerDown = (event) => {
    setClickStart(Date.now());
    startPos.current = { x: event.clientX, y: event.clientY };
  };

  // Maneja el fin del arrastre o clic
  const handlePointerUp = (event) => {
    const deltaX = event.clientX - startPos.current.x;
    const deltaY = event.clientY - startPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Detecta si es un clic corto y cercano para activar handleClick
    if (Date.now() - clickStart < 200 && distance < 5) {
      const faceIndex = faces.findIndex(face => face.position[0] === startPos.current.x && face.position[1] === startPos.current.y);
      if (faceIndex !== -1) handleClick(faceIndex);
    }

    setIsDragging(false);
  };

  // Maneja el movimiento del arrastre
  const handlePointerMove = (event) => {
    const deltaX = event.clientX - startPos.current.x;
    const deltaY = event.clientY - startPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > 5) {
      setIsDragging(true);
      mesh.current.rotation.y += deltaX * 0.001; // Rota el cubo en el eje Y
      mesh.current.rotation.x += deltaY * 0.001; // Rota el cubo en el eje X
      startPos.current = { x: event.clientX, y: event.clientY };
    }
  };

  // Agrega y limpia los event listeners para arrastrar
  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // Actualiza la rotación del cubo en cada frame
  useFrame(() => {
    if (!isAnimating && !isDragging) {
      mesh.current.rotation.x += 0.01; // Rotación continua en el eje X
      mesh.current.rotation.y += 0.01; // Rotación continua en el eje Y
    }
  });

  // Definición de las caras del cubo
  const faces = [
    { position: [0, 0, 1], rotation: [0, 0, 0], text: "Acerca" },
    { position: [0, 0, -1], rotation: [0, Math.PI, 0], text: "BinOS" },
    { position: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0], text: "Trabajos" },
    { position: [0, -1, 0], rotation: [Math.PI / 2, 0, 0], text: "Clientes" },
    { position: [1, 0, 0], rotation: [0, Math.PI / 2, 0], text: "e-Comm" },
    { position: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], text: "Contactos" },
  ];

  return (
    <group ref={mesh} scale={[1.2, 1.2, 1.2]}> {/* Ajusta la escala del cubo en un 20% */}
      {faces.map((face, index) => (
        <Face
          key={index}
          position={face.position}
          rotation={face.rotation}
          onClick={() => handleClick(index)}
          animate={animate[index]}
          text={face.text}
        />
      ))}
    </group>
  );
}

// Componente principal que renderiza el cubo rotatorio dentro de un lienzo
export default function Cube() {
  return (
    <>
      <div className="canvas-container">
        <Canvas style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
          <ambientLight intensity={0.3} /> // Luz ambiental con menor intensidad
          <directionalLight
            position={[5, 5, 5]} // Posición de la luz direccional
            intensity={1} // Intensidad de la luz direccional
            color="white" // Color blanco para la luz direccional
          />
          <pointLight position={[10, 10, 10]} intensity={0.5} /> // Luz puntual con menor intensidad
          <RotatingCube /> // Renderiza el cubo rotatorio
        </Canvas>
      </div>
      <Footer />
    </>
  );
}
