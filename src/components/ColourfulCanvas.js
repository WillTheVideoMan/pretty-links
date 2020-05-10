import React, { useRef, useState, useEffect } from "react"
import SimplexNoise from "simplex-noise"

const ColourfulCanvas = ({ width, height, speed, scale, animate }) => {
  const canvasRef = useRef()
  const tRef = useRef(0)
  const rafRef = useRef()

  const [simplex] = useState(new SimplexNoise())

  const lerp = (x, x1, x2, y1, y2) => y1 + (x - x1) * ((y2 - y1) / (x2 - x1))

  const palette = [
    [255, 0, 0],
    [0, 255, 255],
  ]

  useEffect(() => {
    const frame = () => {
      const ctx = canvasRef.current.getContext("2d")
      const imageData = ctx.createImageData(50, 50)
      for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
          const i = (x + y * 50) * 4
          const n = simplex.noise3D(
            x / scale,
            y / scale,
            tRef.current / (1000 / speed)
          )
          const nMag = Math.abs(n)
          imageData.data[i] = lerp(nMag, 0, 1, palette[0][0], palette[1][0])
          imageData.data[i + 1] = lerp(nMag, 0, 1, palette[0][1], palette[1][1])
          imageData.data[i + 2] = lerp(nMag, 0, 1, palette[0][2], palette[1][2])
          imageData.data[i + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
      tRef.current++
      rafRef.current = requestAnimationFrame(frame)
    }

    if (animate) {
      rafRef.current = requestAnimationFrame(frame)
    } else {
      cancelAnimationFrame(rafRef.current)
    }

    return () => cancelAnimationFrame(rafRef.current)
  }, [simplex, animate, speed, scale])

  useEffect(() => {})

  return (
    <canvas
      ref={canvasRef}
      style={{
        margin: "0",
        padding: "0",
        width: width,
        height: height,
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "0",
      }}
      width="50px"
      height="50px"
    />
  )
}

export default ColourfulCanvas
