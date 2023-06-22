﻿import AvtalUtvalda from "../components/avtal-utvalda";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import { useQuery, gql } from "@apollo/client";
import Loader from "../components/Loader";

const PRODUCTS = gql`
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

const VIEWER = gql`
  query viewer {
    viewer {
      id
    }
  }
`;

export default function MinaAvtal() {
  const { data, loading, error } = useQuery(PRODUCTS);
  const {
    data: viewerData,
    loading: viewerLoading,
    error: viewerError,
  } = useQuery(VIEWER);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  if (viewerLoading) return <Loader />;
  if (viewerError) return <p>Error: {viewerError.message}</p>;

  return (
    <>
      <Breadcrumbs />
      <Container>
        <div className="mx-auto max-w-6xl">
          <h1 className="my-8 text-5xl font-black sm:text-7xl">Mina Avtal</h1>
          <AvtalUtvalda
            products={data.products}
            viewer={viewerData.viewer.id}
          />
        </div>
      </Container>
    </>
  );
}
