import React from "react"
import styled from "styled-components"
import { TYPOGRAPHY, SPACING } from "../styles/constants"
import LinkCard from "../components/LinkCard"

const Container = styled.div`
  min-height: 90vh;
  height: 100%;
  margin: 0 ${SPACING.main.major};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  * {
    z-index: 99;
    user-select: none;
    color: white;
    mix-blend-mode: difference;
  }
`

const Title = styled.div`
  font-family: ${TYPOGRAPHY.fontFamily.heading};
  font-size: ${TYPOGRAPHY.fontSize.heading.massive};
  line-height: ${TYPOGRAPHY.lineHeight.heading};
  text-align: center;
  margin: ${SPACING.accent.minor} 0;
`

const Links = ({ title, links }) => {
  return (
    <Container>
      <Title>{title.toUpperCase()}</Title>
      {links
        ? links.map(link => (
            <LinkCard
              key={link.id}
              text={link.text.toUpperCase()}
              url={link.url}
            />
          ))
        : null}
    </Container>
  )
}

export default Links
