import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthContent from "../components/AuthContent";
import AvtalSparade from "../components/avtal-sparade";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import { getAllAvtal, getWishList } from "../lib/api";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import AvtalCard from "../components/avtal-card";

export default function SparadeAvtal({ products, wishList }) {
  const [favorite, setFavorite] = useState(wishList.productIds);

  useEffect(() => {
    const data = window.localStorage.getItem("SAVE_FAVORITE");
    if (data !== null) setFavorite(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("SAVE_FAVORITE", JSON.stringify(favorite));
  }, [favorite]);

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
        <AuthContent>
          <AvtalSparade
            products={products}
            favorite={favorite}
            setFavorite={setFavorite}
          />
        </AuthContent>
      </div>
      <Container>
        <div className="my-16 rounded-3xl bg-[#FFDCB8] px-16 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="mb-2 text-4xl font-black leading-tight">
              Relaterade avtal
            </h1>
            <Link
              href="/avtal"
              className="flex items-center font-bold text-[#17375E]"
            >
              Visa alla avtal
              <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {products?.edges
              /* .filter((item) => item.node.avtalstyp.valjkund === "Alla") */

              .filter(
                (item) =>
                  !favorite.includes(item.node.productId) &&
                  item.node.avtalstyp.valjkund === null
              )
              .slice(0, 2)
              .map((item) => (
                <AvtalCard
                  className="bg-white shadow-lg"
                  key={item.node.id}
                  productId={item.node.productId}
                  title={item.node.title}
                  excerpt={item.node.excerpt}
                  slug={item.node.slug}
                  categories={item.node.productCategories}
                  sourceUrl={item.node.featuredImage?.node.sourceUrl}
                  favorite={favorite}
                  setFavorite={setFavorite}
                />
              ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const products = await getAllAvtal();
  const wishList = await getWishList();
  return { props: { products, wishList } };
}
