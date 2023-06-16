import Image from "next/image";
import {
  getAllAvtal,
  getCategories,
  getHeroAvtal,
  getWishList,
} from "../../lib/api";
import { ChangeEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Toaster } from "react-hot-toast";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import SearchFilter from "../../components/SearchFilter";

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

export default function Avtal({ allCategories, heroAvtal }) {
  /*   const taggs = products.edges.map((item) =>
    item.node.productTags.edges.map((item) => item.node.name.toLowerCase())
  );
  const tagscontact = taggs.flat(1);*/
  const { heroRubrik, heroBild } = heroAvtal.redigera;
  const [searchString, setSearchString] = useState("");

  const {
    data: productsData,
    loading: productLoading,
    error: productError,
  } = useQuery(PRODUCTS);

  if (productLoading) return <Loader />;
  if (productError) return <p>Error: {productError.message}</p>;

  return (
    <>
      <Toaster />
      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <div className="wp-block-cover relative flex w-full items-center justify-center">
        <div className="absolute z-20 h-full w-full bg-black bg-opacity-50" />
        <div className="relative z-30 flex flex-col text-white">
          <h1 className="mb-8 max-w-2xl text-5xl font-black leading-tight sm:text-7xl">
            {heroRubrik}
          </h1>
          <form action="">
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
              <MagnifyingGlassIcon className="absolute ml-3 h-6 w-6" />
              <input
                type="text"
                className="w-full rounded-full p-4 pl-12 text-black"
                placeholder="Sök avtal"
                value={searchString}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchString(e.target.value)
                }
              />
            </div>
          </form>
        </div>
        <Image
          fill
          className="object-cover"
          alt="header bild"
          src={heroBild.sourceUrl}
        />
      </div>
      <SearchFilter
        productsData={productsData}
        allCategories={allCategories}
        searchString={searchString}
      />
    </>
  );
}

export async function getStaticProps() {
  const products = await getAllAvtal();
  const allCategories = await getCategories();
  const wishList = await getWishList();
  const heroAvtal = await getHeroAvtal();

  return {
    props: { products, allCategories, wishList, heroAvtal },
    revalidate: 10,
  };
}
