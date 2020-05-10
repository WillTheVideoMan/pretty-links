import React, { useState, useEffect } from "react"
import ColourfulCanvas from "../components/ColourfulCanvas"

const App = () => {
  const [animate, setAnimate] = useState(true)
  const [dimensions, setDimensions] = useState([0, 0])

  useEffect(() => {
    const handleResize = () =>
      setDimensions([window.innerWidth, window.innerHeight])
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
          cursor: "pointer",
        }}
        onClick={() => setAnimate(!animate)}
      >
        {animate ? "Pause" : "Play"}
      </h1>
      <ColourfulCanvas
        width={dimensions[0]}
        height={dimensions[1]}
        speed={2.5}
        scale={200}
        animate={animate}
      />
    </div>
  )
}
export default App
