'use client'

import { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import { countries, type Country } from '@/app/lib/portfolioData'

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function CountryPin({
  country,
  active,
  onClick,
}: {
  country: Country
  active: boolean
  onClick: () => void
}) {
  const ref = useRef<THREE.Mesh>(null)
  const pos = useMemo(() => latLngToVector3(country.lat, country.lng, 2.05), [country.lat, country.lng])

  useFrame((state) => {
    if (ref.current && active) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.2)
    }
  })

  return (
    <group position={pos}>
      <Sphere
        ref={ref}
        args={[0.06, 16, 16]}
        onClick={(e) => { e.stopPropagation(); onClick() }}
        onPointerOver={() => { document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'auto' }}
      >
        <meshStandardMaterial
          color={active ? '#d4af37' : '#00f0ff'}
          emissive={active ? '#d4af37' : '#00f0ff'}
          emissiveIntensity={active ? 1.2 : 0.6}
        />
      </Sphere>
      {active && (
        <Html distanceFactor={6} center>
          <div className="px-2 py-1 rounded-lg bg-black/80 border border-[#d4af37]/30 text-xs whitespace-nowrap pointer-events-none">
            {country.flag} {country.name}
          </div>
        </Html>
      )}
    </group>
  )
}

function Earth({ rotationSpeed = 0.001 }: { rotationSpeed?: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += rotationSpeed
  })

  return (
    <Sphere ref={ref} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#0a1628"
        wireframe
        emissive="#00f0ff"
        emissiveIntensity={0.08}
        transparent
        opacity={0.85}
      />
    </Sphere>
  )
}

function GlobeScene({
  activeCountry,
  onSelectCountry,
  autoRotate = true,
}: {
  activeCountry: string | null
  onSelectCountry: (id: string) => void
  autoRotate?: boolean
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#7b2ffc" />
      <Earth rotationSpeed={autoRotate ? 0.002 : 0} />
      {countries.map((c) => (
        <CountryPin
          key={c.id}
          country={c}
          active={activeCountry === c.id}
          onClick={() => onSelectCountry(c.id)}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={autoRotate && !activeCountry}
        autoRotateSpeed={0.5}
      />
    </>
  )
}

interface Globe3DProps {
  activeCountry?: string | null
  onSelectCountry?: (id: string) => void
  className?: string
  height?: string
  autoRotate?: boolean
}

export default function Globe3D({
  activeCountry = null,
  onSelectCountry = () => {},
  className = '',
  height = '500px',
  autoRotate = true,
}: Globe3DProps) {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div className="absolute inset-0 bg-gradient-radial from-[#00f0ff]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <GlobeScene
            activeCountry={activeCountry}
            onSelectCountry={onSelectCountry}
            autoRotate={autoRotate}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export { countries }
