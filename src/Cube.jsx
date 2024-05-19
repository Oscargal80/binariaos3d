import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useNavigate } from 'react-router-dom';
import '@fontsource/jetbrains-mono';
import Footer from './Footer';

const Face = ({ position, rotation, onClick, animate, text }) => {
  const { pos, scale, rot } = useSpring({
    pos: animate ? [0, 0, 1.5] : position,
    scale: animate ? [5, 5, 5] : [1, 1, 1],
    rot: animate ? [0, 0, 0] : rotation,
    config: { duration: 2000, tension: 30, friction: 40 },
  });

  return (
    <a.mesh position={pos} rotation={rot} scale={scale} onClick={onClick}>
      <planeGeometry args={[2, 2]} />
      <meshPhysicalMaterial
        color="black"
        roughness={0.1}
        metalness={0.9}
        reflectivity={1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
      <Edges color="white" />
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.2}
        color="white"
        font="/jetbrains-mono.woff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </a.mesh>
  );
};

function RotatingCube() {
  const mesh = useRef();
  const [animate, setAnimate] = useState(Array(6).fill(false));
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [clickStart, setClickStart] = useState(null);
  const startPos = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleClick = (index) => {
    const newAnimate = Array(6).fill(false);
    newAnimate[index] = true;
    setAnimate(newAnimate);
    setIsAnimating(true);
    setTimeout(() => {
      navigate(`/face/${faces[index].text}`);
      setAnimate(Array(6).fill(false));
      setIsAnimating(false);
    }, 2000);
  };

  const handlePointerDown = (event) => {
    setClickStart(Date.now());
    startPos.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event) => {
    const deltaX = event.clientX - startPos.current.x;
    const deltaY = event.clientY - startPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (Date.now() - clickStart < 200 && distance < 5) {
      const faceIndex = faces.findIndex(face => face.position[0] === startPos.current.x && face.position[1] === startPos.current.y);
      if (faceIndex !== -1) handleClick(faceIndex);
    }

    setIsDragging(false);
  };

  const handlePointerMove = (event) => {
    const deltaX = event.clientX - startPos.current.x;
    const deltaY = event.clientY - startPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > 5) {
      setIsDragging(true);
      mesh.current.rotation.y += deltaX * 0.001;
      mesh.current.rotation.x += deltaY * 0.001;
      startPos.current = { x: event.clientX, y: event.clientY };
    }
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useFrame(() => {
    if (!isAnimating && !isDragging) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  const faces = [
    { position: [0, 0, 1], rotation: [0, 0, 0], text: "Acerca" },
    { position: [0, 0, -1], rotation: [0, Math.PI, 0], text: "BinOS" },
    { position: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0], text: "Trabajos" },
    { position: [0, -1, 0], rotation: [Math.PI / 2, 0, 0], text: "Clientes" },
    { position: [1, 0, 0], rotation: [0, Math.PI / 2, 0], text: "e-Comm" },
    { position: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0], text: "Contactos" },
  ];

  return (
    <group ref={mesh} scale={[1.2, 1.2, 1.2]}>
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

export default function Cube() {
  return (
    <>
      <div className="canvas-container">
        <Canvas style={{ width: '100%', height: 'calc(100vh - 150px)' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="white" />
          <pointLight position={[10, 10, 10]} intensity={1} distance={20} decay={2} />
          <RotatingCube />
        </Canvas>
      </div>
      <Footer />
    </>
  );
}
