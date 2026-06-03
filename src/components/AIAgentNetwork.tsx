/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera, 
  Text, 
  MeshDistortMaterial, 
  MeshTransmissionMaterial,
  Environment,
  ContactShadows,
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

function Node({ position, size, label, color }: { position: [number, number, number], size: number, label: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isDarkMode } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position} ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.6}
          color={color}
        />
        <Text
          position={[0, -size - 0.3, 0]}
          fontSize={0.15}
          color={isDarkMode ? "#ffffff" : "#334155"}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </mesh>
    </Float>
  );
}

function Connections({ nodes }: { nodes: [number, number, number][] }) {
  const { isDarkMode } = useTheme();
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points = [];
    
    // Connect nodes in a web-like fashion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.5) {
          points.push(...nodes[i]);
          points.push(...nodes[j]);
        }
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [nodes]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial 
        color={isDarkMode ? "#A855F7" : "#8B5CF6"} 
        transparent 
        opacity={0.2} 
        linewidth={1}
      />
    </lineSegments>
  );
}

const NODES_DATA: { position: [number, number, number], size: number, label: string, color: string }[] = [
  { position: [0, 1.2, 0], size: 0.6, label: "GPT-4 CORE", color: "#A855F7" },
  { position: [-1.8, 0, 1], size: 0.4, label: "AGENT_01", color: "#3B82F6" },
  { position: [1.8, 0.2, -1], size: 0.4, label: "AGENT_02", color: "#22C55E" },
  { position: [-1.2, -1.5, 0.5], size: 0.35, label: "VISION_NODE", color: "#F59E0B" },
  { position: [1.5, -1.2, 1.2], size: 0.3, label: "TOOLS_API", color: "#EC4899" },
  { position: [0.5, -2, -1], size: 0.45, label: "CLAUDE_SYN", color: "#6366F1" },
];

export default function AIAgentNetwork() {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <ambientLight intensity={isDarkMode ? 0.4 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />
        
        {/* Central Core Glow */}
        <mesh position={[0, 0, -2]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color={isDarkMode ? "#3B0764" : "#F3E8FF"} transparent opacity={0.1} />
        </mesh>

        <group>
          {NODES_DATA.map((node, i) => (
            <Node key={i} {...node} />
          ))}
          <Connections nodes={NODES_DATA.map(n => n.position)} />
        </group>

        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
