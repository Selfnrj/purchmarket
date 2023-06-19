import { gql } from "@apollo/client";

export const RAPPORTER = gql`
  query Rapporter {
    allRapporter(first: 10000) {
      edges {
        node {
          file {
            pdf {
              fileSize
              mediaItemUrl
              title
            }
          }
          title
          id
          rapportUser {
            kopplaRapport {
              id
              name
              email
            }
          }
        }
      }
    }
  }
`;
