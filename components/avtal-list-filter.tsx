import React, { useEffect, useRef, useState } from "react";
import AvtalCard from "./avtal-card";
import { gql, useQuery } from "@apollo/client";
import Loader from "./Loader";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const WISHLIST = gql`
  query WishList {
    getWishList {
      productIds
    }
  }
`;

export default function AvtalListFilter({ products, productId }) {
  const carousel = useRef(null);
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledItems, setShuffledItems] = useState(products?.edges);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  /* useEffect(() => {
    // Shuffle the items array when component mounts
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setShuffledItems(shuffleArray(products?.edges));
  }, []); */

  const {
    data: wishListData,
    loading: wishListLoading,
    error: wishListError,
  } = useQuery(WISHLIST);

  if (wishListLoading) return <Loader />;
  if (wishListError) return <p>Error: {wishListError.message}</p>;

  return (
    <>
      <div
        ref={carousel}
        className="relative z-0 flex touch-pan-x snap-x snap-mandatory gap-3 overflow-hidden scroll-smooth scrollbar"
      >
        {shuffledItems
          .filter(
            (item) =>
              item.node.productId !== productId &&
              item.node.avtalstyp.valjkund === null &&
              !wishListData.getWishList.productIds.includes(item.node.productId)
          )
          .slice(0, 6)
          .map((item, index) => (
            <AvtalCard
              className="w-full shrink-0 snap-start bg-white xl:w-[550px] 2xl:w-[678px]"
              key={index}
              productId={item.node.productId}
              title={item.node.title}
              excerpt={item.node.excerpt}
              slug={item.node.slug}
              categories={item.node.productCategories}
              sourceUrl={item.node.featuredImage?.node.sourceUrl}
              wishList={wishListData.getWishList.productIds}
            />
          ))}
      </div>
      <div className="flex justify-between">
        <button
          className={`${
            isDisabled("prev") && "cursor-not-allowed opacity-50"
          } flex font-bold text-[#17375E]`}
          onClick={movePrev}
          disabled={isDisabled("prev")}
        >
          <ChevronLeftIcon className="mr-2 h-6 w-6" />
          Föregående
        </button>
        <button
          className={`${
            isDisabled("next") && "cursor-not-allowed opacity-50"
          } flex font-bold text-[#17375E]`}
          disabled={isDisabled("next")}
          onClick={moveNext}
        >
          Nästa
          <ChevronRightIcon className="ml-2 h-6 w-6" />
        </button>
      </div>
    </>
  );
}
