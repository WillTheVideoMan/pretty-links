import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import SimplexNoise from "simplex-noise"

const clone = require("rfdc")({ proto: true })

const Canvas = styled.canvas`
  margin: 0;
  padding: 0;
  width: ${props => props.styledWidth}px;
  height: ${props => props.styledHeight}px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`

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

const ColourfulCanvas = ({
  width,
  height,
  palette,
  speed,
  scale,
  resolution,
  fadeInTime,
  animate,
}) => {
  const canvasRef = useRef()
  const tRef = useRef(0)
  const rafRef = useRef()
  const simplex = useRef(new SimplexNoise())

  useEffect(() => {
    const frame = () => {
      let framePalette = clone(palette)

      if (tRef.current <= fadeInTime) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 3; k++) {
              framePalette[i][j][k] = lerp(
                tRef.current,
                0,
                fadeInTime,
                0,
                palette[i][j][k]
              )
            }
          }
        }
      }

      const ctx = canvasRef.current.getContext("2d")
      const imageData = ctx.createImageData(resolution, resolution)

      for (let x = 0; x < resolution; x++) {
        for (let y = 0; y < resolution; y++) {
          const i = (x + y * resolution) * 4
          const noise = simplex.current.noise3D(
            x / scale,
            y / scale,
            tRef.current / (1000 / speed)
          )
          const pixel = getPixel(noise, tRef.current, framePalette)
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
  }, [simplex, palette, speed, scale, resolution, fadeInTime, animate])

  return (
    <Canvas
      ref={canvasRef}
      styledWidth={width}
      styledHeight={height}
      width={`${resolution}px`}
      height={`${resolution}px`}
    />
  )
}

export default ColourfulCanvas
