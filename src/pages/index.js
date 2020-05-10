import React, { useRef, useState, useEffect } from "react"
import SimplexNoise from "simplex-noise"

const App = () => {
  const canvasRef = useRef(null)

  const [dimensions, setDimensions] = useState([0, 0])

  useEffect(() => {
    setDimensions([window.innerWidth, window.innerHeight])
    draw()
  }, [])

  let t = 0

  const simplex = new SimplexNoise()

  const lerp = (x, x1, x2, y1, y2) => y1 + (x - x1) * ((y2 - y1) / (x2 - x1))

  const palette = [
    [255, 0, 0],
    [0, 255, 255],
  ]

  const draw = e => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const imageData = ctx.createImageData(50, 50)

    for (let x = 0; x < 50; x++) {
      for (let y = 0; y < 50; y++) {
        const i = (x + y * 50) * 4
        const n = simplex.noise3D(x / 400, y / 400, t / 400)
        const nMag = Math.abs(n)
        imageData.data[i] = lerp(nMag, 0, 1, palette[0][0], palette[1][0])
        imageData.data[i + 1] = lerp(nMag, 0, 1, palette[0][1], palette[1][1])
        imageData.data[i + 2] = lerp(nMag, 0, 1, palette[0][2], palette[1][2])
        imageData.data[i + 3] = 255
      }
    }
    ctx.putImageData(imageData, 0, 0)

    t++

    window.requestAnimationFrame(draw)
  }

  return (
    <div>
      <h1
        style={{
          zIndex: "99",
          position: "absolute",
          mixBlendMode: "difference",
          color: "white",
          fontFamily: "mono",
          left: "24px",
        }}
      >
        Amazing Text Magic!
      </h1>
      <canvas
        ref={canvasRef}
        style={{
          margin: "0",
          padding: "0",
          width: dimensions[0] + "px",
          height: dimensions[1] + "px",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "0",
        }}
        width="50px"
        height="50px"
      />
    </div>
  )
}

export default App
