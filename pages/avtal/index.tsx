import Image from "next/image";
import Container from "../../components/container";
import { getAllAvtal, getCategories } from "../../lib/api";
import OmslagsBild from "../../public/omslag.jpg";
import AvtalCard from "../../components/avtal-card";
import useAuth, { User } from "../../hooks/useAuth";
import AvtalUtvalda from "../../components/avtal-utvalda";
import { ChangeEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Checkbox from "../../components/checkbox";
import LoadmoreButton from "../../components/loadmore-button";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function Avtal({ products, allCategories }) {
  const taggs = products.edges.map((item) =>
    item.node.productTags.edges.map((item) => item.node.name.toLowerCase())
  );

  const tagscontact = taggs.flat(1);

  console.log("Tagscontact", tagscontact);

  const [postNum, setPostNum] = useState(8); // Default number of posts dislplayed
  const [filteredAvtal, setFilteredAvtal] = useState(products.edges);
  const [avtalTitles, setAvtalTitles] = useState(tagscontact);
  console.log("avtalTitles", avtalTitles);

  const [searchString, setSearchString] = useState("");
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [filtercategories, setFiltercategories] = useState([]);

  const totalCount = products.edges.filter(
    (item) => item.node.avtalstyp.synligtKund === null
  ).length;

  useEffect(() => {
    const filteredPostsTitles: string[] = [...avtalTitles].filter(
      (title) => title.indexOf(searchString.trim().toLowerCase()) !== -1
    );

    console.log("filteredPostsTitles", filteredPostsTitles);

    const refilteredPosts = [...products.edges].filter((item) =>
      filteredPostsTitles.includes(
        item.node.productTags.edges[0].node.name.toLowerCase()
      )
    );

    console.log("refilteredPosts", refilteredPosts);

    setFilteredAvtal(refilteredPosts);
  }, [searchString, avtalTitles, products.edges]);

  useEffect(() => {
    if (filtercategories.length > 0) {
      setIsAllCategory(false);
    } else {
      setIsAllCategory(true);
    }
  }, [filtercategories]);

  return (
    <>
      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <div className="wp-block-cover relative flex w-full items-center justify-center">
        <div className="absolute z-20 h-full w-full bg-black bg-opacity-50" />
        <div className="relative z-30 flex flex-col text-white">
          <h1 className="mb-8 max-w-2xl text-7xl font-black leading-tight">
            Hitta inköpsavtal
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
          placeholder="blur"
          className="object-cover"
          alt="header bild"
          src={OmslagsBild}
        />
      </div>
      <Container>
        <div className="mt-12 grid grid-cols-4 gap-8">
          <div>
            <div className="flex justify-between border border-transparent border-b-gray-300 pb-4">
              Filter
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => {
                  setFiltercategories([]);
                  setIsAllCategory(true);
                }}
              >
                Återställ filter
              </button>
            </div>
            <h6 className="mt-8 mb-4 text-xs font-bold uppercase text-gray-500">
              Kategori
            </h6>
            {allCategories.edges
              /* .filter((exclude) => exclude.node?.name !== "Nyhet") */
              .map((category) => (
                <Checkbox
                  key={category.node.id}
                  handleClick={() => {
                    if (!filtercategories.includes(category.node.name)) {
                      setFiltercategories([
                        ...filtercategories,
                        category.node.name,
                      ]);
                    } else {
                      const selectedCategory = [...filtercategories].filter(
                        (selectedCategory) =>
                          selectedCategory !== category.node.name
                      );
                      setFiltercategories(selectedCategory);
                    }
                  }}
                  name={category.node.name}
                  count={category.node.count}
                  checked={
                    filtercategories.includes(category.node.name)
                      ? "checked"
                      : ""
                  }
                />
              ))}
          </div>
          <div className="col-span-3">
            <div className="mb-4 flex items-center justify-between border border-transparent border-b-gray-300 pb-4">
              <p>Totalt: {totalCount} avtal</p>
            </div>
            {filteredAvtal.length ? (
              filteredAvtal
                .filter((item) => item.node.avtalstyp.synligtKund === null)
                .slice(0, postNum)
                .map((item) => {
                  if (
                    !isAllCategory &&
                    item.node.productCategories.edges
                      .map((item) => item.node.name)
                      .some((category) => filtercategories.includes(category))
                  ) {
                    return (
                      <AvtalCard
                        key={item.node.id}
                        productId={item.node.productId}
                        title={item.node.title}
                        excerpt={item.node.excerpt}
                        slug={item.node.slug}
                        categories={item.node.productCategories}
                        sourceUrl={item.node.featuredImage?.node.sourceUrl}
                      />
                    );
                  } else if (isAllCategory) {
                    return (
                      <AvtalCard
                        key={item.node.id}
                        productId={item.node.productId}
                        title={item.node.title}
                        excerpt={item.node.excerpt}
                        slug={item.node.slug}
                        categories={item.node.productCategories}
                        sourceUrl={item.node.featuredImage?.node.sourceUrl}
                      />
                    );
                  }
                })
            ) : (
              <p className="text-center">Inga avtal hittades...</p>
            )}
            <LoadmoreButton
              number={postNum}
              setNumber={setPostNum}
              allPosts={products}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const products = await getAllAvtal();
  const allCategories = await getCategories();
  return { props: { products, allCategories } };
}
