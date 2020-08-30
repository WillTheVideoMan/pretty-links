require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-json`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@willthevideoman/gatsby-plugin-ackee-tracker`,
      options: {
        domainId: process.env.ACKEE_DOMAIN_ID,
        server: process.env.ACKEE_SERVER,
        ignoreLocalhost: true,
        detailed: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
}
