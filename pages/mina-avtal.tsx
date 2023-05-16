﻿import { useEffect, useState } from "react";
import AuthContent from "../components/AuthContent";
import AvtalUtvalda from "../components/avtal-utvalda";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import { getAllAvtal, getWishList } from "../lib/api";

export default function MinaAvtal({ wishList, products }) {
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
      <Container>
        <div className="mx-auto max-w-6xl">
          <h1 className="my-8 text-6xl font-black leading-tight">Mina Avtal</h1>
          <AuthContent>
            <AvtalUtvalda
              products={products}
              favorite={favorite}
              setFavorite={setFavorite}
            />
          </AuthContent>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const wishList = await getWishList();
  const products = await getAllAvtal();

  return { props: { wishList, products } };
}
