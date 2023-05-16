import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AvtalSparade from "../components/avtal-sparade";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import { getAllAvtal, getWishList } from "../lib/api";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import AvtalCard from "../components/avtal-card";
import AvtalList from "../components/avtal-list";

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
        <AvtalSparade
          products={products}
          favorite={favorite}
          setFavorite={setFavorite}
        />
      </div>
      <Container>
        <AvtalList
          rubrik="Relaterade avtal"
          products={products}
          favorite={favorite}
          setFavorite={setFavorite}
        />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const products = await getAllAvtal();
  const wishList = await getWishList();
  return { props: { products, wishList } };
}
