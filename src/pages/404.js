import React from "react"
import Links from "../components/Links"
import Layout from "../components/Layout"

export default () => (
  <Layout
    palette={[
      [
        [0, 0, 0],
        [255, 255, 255],
      ],
      [
        [255, 255, 255],
        [0, 0, 0],
      ],
    ]}
  >
    <Links
      title="404: Nothing to see here."
      links={[{ id: 0, text: "Return Home", url: "/" }]}
    />
  </Layout>
)
