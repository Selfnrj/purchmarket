import Image from "next/image";
import { getCategories, getHeroAvtal } from "../../lib/api";
import { ChangeEvent, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import SearchFilter from "../../components/SearchFilter";
import { PRODUCTS } from "../../lib/getProducts";

export default function Avtal({ allCategories, heroAvtal }) {
  /*   const taggs = products.edges.map((item) =>
    item.node.productTags.edges.map((item) => item.node.name.toLowerCase())
  );
  const tagscontact = taggs.flat(1);*/
  const { heroRubrik, heroBild } = heroAvtal.redigera;
  const [searchString, setSearchString] = useState("");

  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Remove the input focus
      inputRef.current.blur();
    }
  };

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

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
                onKeyPress={handleKeyPress}
                ref={inputRef}
                onClick={handleInputClick}
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
  const allCategories = await getCategories();
  const heroAvtal = await getHeroAvtal();

  return {
    props: { allCategories, heroAvtal },
    revalidate: 10,
  };
}
