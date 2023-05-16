﻿import { useEffect, useState } from "react";
import AvtalUtvalda from "../components/avtal-utvalda";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/container";
import { getAllAvtal, getUser, getWishList } from "../lib/api";
import { GetStaticProps } from "next";

export default function MinaAvtal({ wishList, viewer, products }) {
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
          <AvtalUtvalda
            products={products}
            viewer={viewer}
            favorite={favorite}
            setFavorite={setFavorite}
          />
        </div>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const viewer = await getUser();
  const wishList = await getWishList();
  const products = await getAllAvtal();

  return {
    props: { viewer, wishList, products },
    revalidate: 10,
  };
};
