import React from "react"
import Links from "../components/Links"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

const Index = ({ data }) => {
  const links = data.allLinksJson
    ? data.allLinksJson.edges.map(edge => edge.node)
    : []
  const palette = data.allPaletteJson.edges.map(edge => [
    edge.node.from,
    edge.node.to,
  ])

  return (
    <Layout palette={palette}>
      <Links title="@willthevideoman" links={links} />
    </Layout>
  )
}

export default Index

export const indexQuery = graphql`
  query {
    allLinksJson {
      edges {
        node {
          id
          text
          url
        }
      }
    }
    allPaletteJson {
      edges {
        node {
          id
          from
          to
        }
      }
    }
  }
`
