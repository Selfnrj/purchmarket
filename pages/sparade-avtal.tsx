import { gql, useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import AuthContent from "../components/AuthContent";

import AvtalSparade from "../components/avtal-sparade";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import { getAllAvtal, getWishList } from "../lib/api";

export default function sparadeAvtal({ products, wishList }) {
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
          <AvtalSparade allAvtal={products} wishList={wishList} />
        </AuthContent>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const products = await getAllAvtal();
  const wishList = await getWishList();
  return { props: { products, wishList } };
}
