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
        transmission={1} // Adding transparency
        thickness={0.5} // Adjust thickness to give a glass-like feel
        envMapIntensity={1} // Enhance reflections
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

  useFrame(() => {
    if (!isAnimating) {
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
    <group ref={mesh} scale={[1.0, 1.0, 1.0]}>
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
        <Canvas style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="white" />
          <pointLight position={[10, 10, 10]} intensity={1} distance={20} decay={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} distance={20} decay={2} color="blue" />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="red" />
          <RotatingCube />
        </Canvas>
      </div>
      <Footer />
    </>
  );
}
