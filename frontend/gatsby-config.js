// gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Digital ConOps`,
    description: `Web service for small engineering teams that provide formal future system concept of operation`,
    author: `@skoltech`,
  },
  plugins: [
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://10.129.0.14:3001",
        collectionTypes: ["stakehlder", "need", "problem", "enterprise", "process", "life-cylce-stage", "objective", "solution", "technology", "requirement", "project"], // Ensure this matches your Strapi collection type
        queryLimit: 1000, // Defaults to 100
      },
    }
  ],
};
