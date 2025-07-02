"use client"

import { useEffect, useRef } from "react"

export default function BackgroundBeams() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const beams = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
      length: 100 + Math.random() * 200,
      opacity: 0.1 + Math.random() * 0.2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      beams.forEach((beam) => {
        beam.x += Math.cos(beam.angle) * beam.speed
        beam.y += Math.sin(beam.angle) * beam.speed

        if (beam.x < 0 || beam.x > canvas.width) beam.angle = Math.PI - beam.angle
        if (beam.y < 0 || beam.y > canvas.height) beam.angle = -beam.angle

        const gradient = ctx.createLinearGradient(
          beam.x,
          beam.y,
          beam.x + Math.cos(beam.angle) * beam.length,
          beam.y + Math.sin(beam.angle) * beam.length,
        )
        gradient.addColorStop(0, `rgba(99, 102, 241, ${beam.opacity})`)
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${beam.opacity * 0.8})`)
        gradient.addColorStop(1, `rgba(99, 102, 241, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(beam.x, beam.y)
        ctx.lineTo(beam.x + Math.cos(beam.angle) * beam.length, beam.y + Math.sin(beam.angle) * beam.length)
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20"
      style={{ zIndex: 1 }}
    />
  )
}
