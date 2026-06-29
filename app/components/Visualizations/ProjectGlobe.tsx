'use client'

import { useEffect, useRef } from 'react'

const projects = [
  { name: 'MAONI', lat: -4.0383, lng: 21.7587, color: '#00f0ff' },
  { name: 'ARPTC Tower Map', lat: -4.0383, lng: 21.7587, color: '#7b2ffc' },
  { name: 'Selzara', lat: 37.7749, lng: -122.4194, color: '#ff6b35' },
  { name: 'AwazPK', lat: 30.3753, lng: 69.3451, color: '#00f0ff' },
  { name: 'JustFly', lat: 9.0820, lng: 8.6753, color: '#7b2ffc' },
  { name: 'SolidBridge', lat: 51.5074, lng: -0.1278, color: '#ff6b35' },
]

export default function ProjectGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width = 400
    const height = canvas.height = 400
    const centerX = width / 2
    const centerY = height / 2
    const radius = 150

    let rotation = 0

    function drawGlobe() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, width, height)

      // Draw globe background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.05)')
      gradient.addColorStop(0.8, 'rgba(0, 240, 255, 0.02)')
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)')
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(angle + rotation) * radius, centerY + Math.sin(angle + rotation) * radius)
        ctx.stroke()
      }

      // Draw project points
      projects.forEach((project) => {
        const latRad = project.lat * Math.PI / 180
        const lngRad = project.lng * Math.PI / 180 + rotation
        
        const x = centerX + radius * Math.cos(latRad) * Math.sin(lngRad)
        const y = centerY + radius * Math.sin(latRad)
        
        // Draw glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 20)
        glow.addColorStop(0, project.color + '40')
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.fillRect(x - 20, y - 20, 40, 40)
        
        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = project.color
        ctx.fill()
        ctx.shadowColor = project.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })

      rotation += 0.002
      requestAnimationFrame(drawGlobe)
    }

    drawGlobe()
  }, [])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full max-w-[400px] mx-auto" />
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <p className="text-xs text-gray-500">Projects across 5 countries</p>
      </div>
    </div>
  )
}