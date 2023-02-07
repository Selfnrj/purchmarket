import { gql, useMutation, useQuery } from "@apollo/client";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CURRENT_WISHLIST = gql`
  query GetWishList {
    getWishList {
      productIds
    }
  }
`;

const ADD_FAVORITE = gql`
  mutation ADD_FAVORITE($productId: Int!) {
    addToWishlist(input: { productId: $productId }) {
      added
      clientMutationId
      error
      productId
      wishlistProductIds
    }
  }
`;

const REMOVE_FAVORITE = gql`
  mutation REMOVE_FAVORITE($productId: Int!) {
    removeFromWishlist(input: { productId: $productId }) {
      productId
    }
  }
`;

export default function StarButton({ productId, icon }) {
  const { data } = useQuery(CURRENT_WISHLIST);
  const [favoriteAdd] = useMutation(ADD_FAVORITE);
  const [favoriteRemove] = useMutation(REMOVE_FAVORITE);
  const [favorite, setFavorite] = useState<Boolean>(false);
  const router = useRouter();

  const wishlist = data?.getWishList?.productIds;

  console.log(wishlist);

  /*   useEffect(() => {
    const data = window.localStorage.getItem("SAVE_FAVORITE");
    if (data !== null) setFavorite(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("SAVE_FAVORITE", JSON.stringify(favorite));
  }, [favorite]); */

  const toggleAvtal = () => {
    if (wishlist.includes(productId)) {
      toast.success("Avtalet har tagits bort");
      setFavorite(false);
      favoriteRemove({ variables: { productId: productId } });
      router.reload();
    } else {
      toast.success("Avtalet är sparat");
      setFavorite(true);
      favoriteAdd({ variables: { productId: productId } });
      router.reload();
    }
  };

  return (
    <div>
      {icon === true ? (
        <button
          onClick={toggleAvtal}
          className="absolute top-6 right-6 h-6 w-6 cursor-pointer text-yellow-500"
        >
          {wishlist?.includes(productId) ? (
            <StarIcon className="h-6 w-6 text-[#FFAB57]" />
          ) : (
            <StarIconOutline className="h-6 w-6 text-[#FFAB57]" />
          )}
        </button>
      ) : (
        <button
          onClick={toggleAvtal}
          className="flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-6 py-3 font-bold text-gray-900 hover:bg-gray-200"
        >
          {wishlist?.includes(productId) ? (
            <div className="flex">
              <StarIcon className="mr-2 h-6 w-6 text-[#FFAB57]" />
              Sparat
            </div>
          ) : (
            <div className="flex">
              <StarIconOutline className="mr-2 h-6 w-6 text-[#FFAB57]" />
              Spara avtal
            </div>
          )}
        </button>
      )}
    </div>
  );
}
