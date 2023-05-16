import Image from "next/image";
import Container from "../../components/container";
import {
  getAllAvtal,
  getCategories,
  getHeroAvtal,
  getWishList,
} from "../../lib/api";
import { ChangeEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Checkbox from "../../components/checkbox";
import LoadmoreButton from "../../components/loadmore-button";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Toaster } from "react-hot-toast";
import AvtalFilterlist from "../../components/avtal-filterlist";
import AuthContent from "../../components/AuthContent";
import useAuth from "../../hooks/useAuth";
import UnAuthContent from "../../components/UnAuthContent";
import AvtalFilterlistLogout from "../../components/avtal-filterlist-logout";

export default function Avtal({
  products,
  allCategories,
  wishList,
  heroAvtal,
}) {
  /*   const taggs = products.edges.map((item) =>
    item.node.productTags.edges.map((item) => item.node.name.toLowerCase())
  );
  const tagscontact = taggs.flat(1);*/

  const { loggedIn } = useAuth();

  const [favorite, setFavorite] = useState(wishList.productIds);

  useEffect(() => {
    const data = window.localStorage.getItem("SAVE_FAVORITE");
    if (data !== null) setFavorite(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("SAVE_FAVORITE", JSON.stringify(favorite));
  }, [favorite]);

  const [postNum, setPostNum] = useState(8); // Default number of posts dislplayed
  const [filteredAvtal, setFilteredAvtal] = useState(products.edges);
  const [avtalTitles, setAvtalTitles] = useState(
    products.edges.map((item) => item.node.title.toLowerCase())
  );
  const [avtalContent, setAvtalContent] = useState(
    products.edges.map((item) => item.node.sok.sokord.toLowerCase())
  );
  const [searchString, setSearchString] = useState("");
  const [isAllCategory, setIsAllCategory] = useState(true);
  const [filtercategories, setFiltercategories] = useState([]);

  useEffect(() => {
    const filteredPostsTitles: string[] = [...avtalTitles].filter(
      (title) => title.indexOf(searchString.trim().toLowerCase()) !== -1
    );
    const filteredPostsContent: string[] = [...avtalContent].filter(
      (title) => title?.indexOf(searchString.trim().toLowerCase()) !== -1
    );

    const refilteredPosts = [...products.edges].filter(
      (item) =>
        filteredPostsTitles.includes(item.node.title.toLowerCase()) ||
        filteredPostsContent.includes(item.node.sok.sokord.toLowerCase())
    );

    setFilteredAvtal(refilteredPosts);
  }, [searchString, avtalTitles, products.edges]);

  useEffect(() => {
    if (filtercategories.length > 0) {
      setIsAllCategory(false);
    } else {
      setIsAllCategory(true);
    }
  }, [filtercategories]);

  const { heroRubrik, heroBild } = heroAvtal.redigera;

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
      <Container>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 sm:gap-8">
          <div className="mb-8 sm:mb-0">
            <div className="flex justify-between border border-transparent border-b-gray-300 pb-4 ">
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
                  checked={
                    filtercategories.includes(category.node.name)
                      ? "checked"
                      : ""
                  }
                />
              ))}
          </div>
          <div className="col-span-3">
            {loggedIn ? (
              <AuthContent>
                <AvtalFilterlist
                  filteredAvtal={filteredAvtal}
                  isAllCategory={isAllCategory}
                  postNum={postNum}
                  favorite={favorite}
                  setFavorite={setFavorite}
                  filtercategories={filtercategories}
                />
              </AuthContent>
            ) : (
              <UnAuthContent>
                <AvtalFilterlistLogout
                  filteredAvtal={filteredAvtal}
                  isAllCategory={isAllCategory}
                  postNum={postNum}
                  favorite={favorite}
                  setFavorite={setFavorite}
                  filtercategories={filtercategories}
                />
              </UnAuthContent>
            )}
            {postNum < filteredAvtal.length && isAllCategory ? (
              <LoadmoreButton postNum={postNum} setNumber={setPostNum} />
            ) : null}
          </div>
        </div>
      </Container>
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
    revalidate: 5,
  };
}
