import React, { useRef, useState, useEffect } from "react"
import SimplexNoise from "simplex-noise"

const ColourfulCanvas = ({ width, height, palette, speed, scale, animate }) => {
  const canvasRef = useRef()
  const tRef = useRef(0)
  const rafRef = useRef()

  const [simplex] = useState(new SimplexNoise())

  const lerp = (x, x1, x2, y1, y2) => y1 + (x - x1) * ((y2 - y1) / (x2 - x1))

  const getPixel = (noise, time, palette) => {
    const noiseMagnitude = Math.abs(noise)
    const paletteEvolution = Math.sin(((time % 3600) / 10) * (Math.PI / 180))

    let rgb = []

    for (let i = 0; i < 3; i++) {
      rgb.push(
        lerp(
          noiseMagnitude,
          0,
          1,
          lerp(paletteEvolution, -1, 1, palette[0][0][i], palette[1][0][i]),
          lerp(paletteEvolution, -1, 1, palette[0][1][i], palette[1][1][i])
        )
      )
    }
    return rgb
  }

  useEffect(() => {
    const frame = () => {
      const ctx = canvasRef.current.getContext("2d")
      const imageData = ctx.createImageData(50, 50)

      for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
          const i = (x + y * 50) * 4
          const noise = simplex.noise3D(
            x / scale,
            y / scale,
            tRef.current / (1000 / speed)
          )
          const pixel = getPixel(noise, tRef.current, palette)
          imageData.data[i] = pixel[0]
          imageData.data[i + 1] = pixel[1]
          imageData.data[i + 2] = pixel[2]
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
  }, [simplex, palette, speed, scale, animate])

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
