import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import { getAllAvtal, getAllPostsForHome, getWishList } from "../lib/api";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import PageCover from "../components/page-cover";
import LatestStories from "../components/latest-stories";
import AvtalList from "../components/avtal-list";
import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const STARTSIDA_QUERY = gql`
  query Startsida {
    redigera(id: "cG9zdDo0MTI=") {
      id
      redigera {
        heroText
        heroRubrik
        heroBild {
          sourceUrl
        }
      }
    }
  }
`;

export default function Index({ allPosts, products, wishList }) {
  const { data, loading, error } = useQuery(STARTSIDA_QUERY);
  const [favorite, setFavorite] = useState(wishList.productIds);

  useEffect(() => {
    const data = window.localStorage.getItem("SAVE_FAVORITE");
    if (data !== null) setFavorite(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("SAVE_FAVORITE", JSON.stringify(favorite));
  }, [favorite]);

  console.log("wishlist", favorite);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const { heroText, heroRubrik, heroBild } = data.redigera.redigera;
  return (
    <>
      <Head>
        <title>Purchmarket</title>
      </Head>
      <Toaster />
      <div>
        <PageCover
          rubrik={heroRubrik}
          text={heroText}
          bild={heroBild.sourceUrl}
        />
        <Container>
          <LatestStories allPosts={allPosts} />
        </Container>
        <Link href="/omoss" rel="preload" as="image">
          <div className="wp-block-cover relative flex w-full items-center">
            <div className="absolute z-40 h-full w-full bg-black bg-opacity-50" />
            <div className="container relative z-40 mx-auto px-5 text-white">
              <h1 className="mb-8 max-w-2xl text-5xl font-black leading-tight">
                Vi skapar en bättre vård och omsorg
              </h1>
              <p className="mb-8 max-w-lg text-xl leading-8">
                Purch är en inköpsorganisation, specialiserad på vård och
                omsorg, som arbetar i nära samarbete med kunder och medlemmar.
              </p>
              <b className="flex items-center font-bold text-white">
                Om oss
                <ArrowRightIcon className="ml-2 h-6 w-6 text-white" />
              </b>
            </div>
            <Image
              fill
              sizes="100vw"
              className="object-cover"
              alt="header bild"
              src={heroBild.sourceUrl}
            />
          </div>
        </Link>
        <Container>
          <AvtalList
            rubrik="Inköpsavtal"
            products={products}
            favorite={favorite}
            setFavorite={setFavorite}
          />
        </Container>
        <Link href="/rapporter" rel="preload" as="image">
          <div className="flex w-full items-center bg-[#DFEDFF] py-16">
            <div className="container mx-auto px-5">
              <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
                <div>
                  <h1 className="mb-8 max-w-lg text-5xl font-black leading-tight">
                    Alla dina rapporterer samlade på en sida
                  </h1>
                  <p className="mb-8 text-xl leading-8">
                    A wonderful serenity has taken possession of my entire soul.
                  </p>
                  <b className="flex items-center font-bold">
                    Rapporter
                    <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
                  </b>
                </div>
                <div>
                  <Image
                    width={800}
                    height={800}
                    className="rounded-xl object-cover"
                    alt="header bild"
                    src={heroBild.sourceUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const products = await getAllAvtal();
  const wishList = await getWishList();

  return {
    props: { allPosts, products, preview, wishList },
    revalidate: 1,
  };
};
