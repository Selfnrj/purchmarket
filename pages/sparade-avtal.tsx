import { Toaster } from "react-hot-toast";
import AvtalSparade from "../components/avtal-sparade";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import AvtalList from "../components/avtal-list";
import Loader from "../components/Loader";
import { PRODUCTS } from "../lib/getProducts";
import { useQuery } from "@apollo/client";

export default function SparadeAvtal() {
  const {
    data: productsData,
    loading: productLoading,
    error: productError,
  } = useQuery(PRODUCTS);

  if (productLoading) return <Loader />;
  if (productError) return <p>Error: {productError.message}</p>;

  return (
    <>
      <Breadcrumbs />
      <Container>
        <div className="mx-auto max-w-6xl">
          <Toaster />
          <div className="mt-12 mb-8">
            <h1 className="text-5xl font-black sm:text-7xl">Sparade avtal</h1>
            <p className="font-semibold leading-8">
              Här hittar du alla dina sparade avtal.
            </p>
          </div>
          <AvtalSparade products={productsData.products} />
        </div>
        <AvtalList rubrik="Relaterade avtal" />
      </Container>
    </>
  );
}
