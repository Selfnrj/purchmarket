import { gql } from "@apollo/client";

export const RAPPORTER = gql`
  query Rapporter {
    allRapporter(first: 1000) {
      edges {
        node {
          file {
            pdf {
              mediaItemUrl
            }
          }
          title
          id
          rapportUser {
            kopplaRapport {
              id
            }
          }
        }
      }
    }
  }
`;
