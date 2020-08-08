import React, { useState, useEffect } from "react"
import ColourfulCanvas from "../components/ColourfulCanvas"
import { createGlobalStyle } from "styled-components"
import Helmet from "react-helmet"

const GlobalStyle = createGlobalStyle`
  :root {
    box-sizing: border-box;
    @media only screen and (min-width: 36rem) {
      font-size: 18px;
    }
    @media only screen and (min-width: 64rem) {
      font-size: 20px;
    }
  }
  body{
    margin: 0;
    background-color: black;
  }
`

const Layout = ({ children, palette }) => {
  const [dimensions, setDimensions] = useState([0, 0])

  useEffect(() => {
    const handleResize = () =>
      setDimensions([window.innerWidth, window.innerHeight])
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <GlobalStyle />

      {children}

      <ColourfulCanvas
        width={dimensions[0]}
        height={dimensions[1]}
        palette={palette}
        speed={2}
        scale={100}
        resolution={50}
        fadeInTime={150}
        animate={true}
      />
    </>
  )
}

export default Layout
