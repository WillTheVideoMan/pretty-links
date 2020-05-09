import React, { useRef } from "react"
import SimplexNoise from "simplex-noise"

const App = () => {
  const canvasRef = useRef(null)

  let t = 0

  const simplex = new SimplexNoise()

  const handleClick = e => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const imageData = ctx.createImageData(50, 50)

    for (let x = 0; x < 50; x++) {
      for (let y = 0; y < 50; y++) {
        const i = (x + y * 50) * 4
        const r = Math.abs(simplex.noise3D(x / 400, y / 400, t / 500) * 255)
        const g = Math.abs(simplex.noise3D(x / 400, y / 400, t / 500 + 1) * 255)
        const b = Math.abs(simplex.noise3D(x / 400, y / 400, t / 500 + 2) * 255)
        imageData.data[i] = r
        imageData.data[i + 1] = g
        imageData.data[i + 2] = b
        imageData.data[i + 3] = 255
      }
    }
    ctx.putImageData(imageData, 0, 0)

    t++

    window.requestAnimationFrame(handleClick)
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        margin: "0",
        padding: "0",
        width: "500px",
        height: "500px",
      }}
      width="50px"
      height="50px"
      onClick={handleClick}
    />
  )
}

export default App
