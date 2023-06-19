import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Avtal {
    products(
      where: { orderby: { field: MENU_ORDER, order: ASC } }
      first: 10000
    ) {
      edges {
        node {
          date
          excerpt
          content
          id
          productId
          title
          slug
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          productCategories {
            edges {
              node {
                id
                name
              }
            }
          }
          productTags {
            edges {
              node {
                id
                name
              }
            }
          }
          avtalstyp {
            valjkund {
              id
            }
            leverantor {
              ... on Leverantorer {
                title
              }
            }
          }
          sok {
            sokord
          }
        }
      }
    }
  }
`;
