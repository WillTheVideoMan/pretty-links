import React from "react"
import styled from "styled-components"
import { TYPOGRAPHY, SPACING } from "../styles/constants"

const Container = styled.a`
  border: 0.25rem solid white;
  max-width: 28rem;
  padding: 0 ${SPACING.main.major};
  margin-top: ${SPACING.main.minor};
  margin-bottom: ${SPACING.main.major};
  text-decoration: none;
`

const Text = styled.div`
  font-family: ${TYPOGRAPHY.fontFamily.heading};
  font-size: ${TYPOGRAPHY.fontSize.body.tertiary};
  line-height: ${TYPOGRAPHY.lineHeight.body};
`

const LinkCard = ({ text, url }) => {
  return (
    <Container href={url}>
      <Text>{text}</Text>
    </Container>
  )
}

export default LinkCard
