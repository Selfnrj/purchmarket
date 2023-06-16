import { gql, useQuery } from "@apollo/client";
import Loader from "./Loader";
import AvtalCard from "./avtal-card";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadmoreButton from "./loadmore-button";

const WISHLIST = gql`
  query WishList {
    getWishList {
      productIds
    }
  }
`;

export default function AvtalFiltered({
  filteredAvtal,
  isAllCategory,
  filtercategories,
  viewerData,
}) {
  const { status } = useSession();
  const [postNum, setPostNum] = useState(8); // Default number of posts dislplayed

  const {
    data: wishListData,
    loading: wishListLoading,
    error: wishListError,
  } = useQuery(WISHLIST);

  if (wishListLoading) return <Loader />;
  if (wishListError) return <p>Error: {wishListError.message}</p>;

  return (
    <>
      {filteredAvtal.length ? (
        filteredAvtal
          .filter((item) => {
            if (status === "authenticated") {
              return (
                item.node.avtalstyp.valjkund === null ||
                item.node.avtalstyp.valjkund?.some((item) =>
                  item.id.includes(viewerData.viewer.id)
                )
              );
            } else {
              return item.node.avtalstyp.valjkund === null;
            }
          })
          .slice(...(isAllCategory ? [0, postNum] : [0, 1000]))
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
                  wishList={wishListData?.getWishList.productIds}
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
                  wishList={wishListData?.getWishList.productIds}
                />
              );
            }
          })
      ) : (
        <p className="text-center">Inga avtal hittades...</p>
      )}
      {postNum < filteredAvtal.length && isAllCategory ? (
        <LoadmoreButton postNum={postNum} setNumber={setPostNum} />
      ) : null}
    </>
  );
}
