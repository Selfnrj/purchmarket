import { gql } from "@apollo/client";

export const RAPPORTER = gql`
  query Rapporter {
    allRapporter(last: 92) {
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
