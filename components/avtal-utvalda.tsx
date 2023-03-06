import { gql, useQuery } from "@apollo/client";
import useAuth, { User } from "../hooks/useAuth";
import AvtalCard from "./avtal-card";

const PRODUCT_QUERY = gql`
  query Avtal {
    products {
      edges {
        node {
          date
          excerpt
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
        }
      }
    }
  }
`;

export default function AvtalUtvalda() {
  const { data, loading, error } = useQuery(PRODUCT_QUERY);
  const { user } = useAuth();
  const { id } = user as User;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const allProducts = data.products.edges;

  return (
    <div>
      {allProducts
        .filter((item) => item.node.avtalstyp.valjkund?.id === id)
        .map((item) => (
          <AvtalCard
            key={item.node.id}
            productId={item.node.id}
            title={item.node.title}
            excerpt={item.node.excerpt}
            slug={item.node.slug}
            categories={item.node.productCategories}
            sourceUrl={item.node.featuredImage.node.sourceUrl}
          />
        ))}
    </div>
  );
}
