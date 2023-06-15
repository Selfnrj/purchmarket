import { Toaster } from "react-hot-toast";
import AvtalSparade from "../components/avtal-sparade";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import { getAllAvtal, getWishList } from "../lib/api";
import AvtalList from "../components/avtal-list";

export default function SparadeAvtal({ products }) {
  return (
    <>
      <Breadcrumbs />
      <div className="mx-auto max-w-6xl">
        <Toaster />
        <div className="mt-12 mb-8">
          <h1 className="text-7xl font-bold">Sparade avtal</h1>
          <p className="font-semibold leading-8">
            Här hittar du alla dina sparade avtal.
          </p>
        </div>
        <AvtalSparade products={products} />
      </div>
      <Container>
        <AvtalList rubrik="Relaterade avtal" products={products} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const products = await getAllAvtal();
  const wishList = await getWishList();
  return { props: { products, wishList } };
}
