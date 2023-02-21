import { gql, useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import AuthContent from "../components/AuthContent";

import AvtalSparade from "../components/avtal-sparade";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import Loader from "../components/Loader";
import { getAllAvtal } from "../lib/api";

const CURRENT_WISHLIST = gql`
  query GetWishList {
    getWishList {
      productIds
    }
  }
`;

export default function sparadeAvtal(products) {
  const { data, error, loading } = useQuery(CURRENT_WISHLIST);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Breadcrumbs />
      <Container>
        <Toaster />
        <div className="mt-12 mb-8">
          <h1 className="text-7xl font-bold">Sparade avtal</h1>
          <p className="font-semibold leading-8">
            Här hittar du alla dina sparade avtal.
          </p>
        </div>
        <AuthContent>
          {data && <AvtalSparade allAvtal={products} data={data} />}
        </AuthContent>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const products = await getAllAvtal();
  return { props: products };
}
