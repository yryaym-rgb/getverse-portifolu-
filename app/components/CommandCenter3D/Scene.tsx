'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

interface ProjectNode {
  id: string
  name: string
  color: string
  position: [number, number, number]
  shape: 'sphere' | 'box' | 'torus'
}

const projects: ProjectNode[] = [
  { id: 'maoni', name: 'MAONI', color: '#00f0ff', position: [4, 0, 0], shape: 'sphere' },
  { id: 'arptc', name: 'ARPTC', color: '#7b2ffc', position: [-4, 1, 1], shape: 'box' },
  { id: 'selzara', name: 'Selzara', color: '#ff6b35', position: [0, -3, 2], shape: 'torus' },
  { id: 'justfly', name: 'JustFly', color: '#00ff88', position: [2, 3, -2], shape: 'sphere' },
  { id: 'solidbridge', name: 'SolidBridge', color: '#ff00ff', position: [-3, -2, -1], shape: 'box' },
]

function Hub() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.2
  })
  return (
    <Sphere ref={ref} args={[1.5, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#00f0ff" wireframe emissive="#00f0ff" emissiveIntensity={0.3} />
    </Sphere>
  )
}

function ProjectObject({
  node,
  onSelect,
}: {
  node: ProjectNode
  onSelect: (id: string) => void
}) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime + node.position[0]) * 0.15
    }
  })

  const material = (
    <meshStandardMaterial
      color={node.color}
      emissive={node.color}
      emissiveIntensity={hovered ? 0.6 : 0.2}
    />
  )

  return (
    <group position={node.position}>
      {node.shape === 'sphere' && (
        <Sphere
          ref={ref}
          args={[0.5, 16, 16]}
          onClick={() => onSelect(node.id)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {material}
        </Sphere>
      )}
      {node.shape === 'box' && (
        <Box
          ref={ref}
          args={[0.8, 0.8, 0.8]}
          onClick={() => onSelect(node.id)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {material}
        </Box>
      )}
      {node.shape === 'torus' && (
        <Torus
          ref={ref}
          args={[0.4, 0.15, 16, 32]}
          onClick={() => onSelect(node.id)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {material}
        </Torus>
      )}
      <Html position={[0, 1, 0]} center distanceFactor={8}>
        <div
          className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition ${
            hovered ? 'bg-[#00f0ff] text-black' : 'bg-black/80 text-white border border-white/20'
          }`}
        >
          {node.name}
        </div>
      </Html>
    </group>
  )
}

export default function Scene({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 60 }}
      style={{ height: '100vh', width: '100%' }}
      aria-label="3D project command center"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -5, -5]} intensity={0.5} color="#7b2ffc" />
      <OrbitControls enablePan={false} minDistance={5} maxDistance={20} />
      <Hub />
      {projects.map((p) => (
        <ProjectObject key={p.id} node={p} onSelect={onSelect} />
      ))}
    </Canvas>
  )
}
