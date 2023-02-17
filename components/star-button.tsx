import { gql, useMutation, useQuery } from "@apollo/client";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MenuContext from "../contexts/click";
import Loader from "./Loader";

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
  const { data, loading, refetch } = useQuery(CURRENT_WISHLIST);

  if (loading) {
    return <div>Loading...</div>;
  }

  const [favoriteAdd] = useMutation(ADD_FAVORITE);
  const [favoriteRemove] = useMutation(REMOVE_FAVORITE);
  const router = useRouter();

  const wishlist = data?.getWishList?.productIds;

  //const [favorite, setFavorite] = useState(wishlist);
  const [favorite, setFavorite] = useState(wishlist);

  const RemoveFavorite = (productId) => {
    favoriteRemove({ variables: { productId: productId } });
    setFavorite((prevFavorite) =>
      prevFavorite.filter((id) => id !== productId)
    );
    toast.success("Avtalet har tagits bort");
    //router.reload();
    refetch();
  };

  const AddFavorite = (productId) => {
    //setFavorite(true);
    favoriteAdd({ variables: { productId: productId } });
    setFavorite((prevFavorite) => [...prevFavorite, productId]);
    toast.success("Avtalet är sparat");
    //router.reload();
    refetch();
  };

  console.log("wishlist", wishlist);
  //console.log("favorites", favorite);

  return (
    <div>
      {favorite?.includes(productId) ? (
        <button
          onClick={() => {
            RemoveFavorite(productId);
          }}
          className="absolute top-0 right-0 h-6 w-6 cursor-pointer text-yellow-500"
        >
          <StarIcon className="h-6 w-6 text-[#FFAB57]" />
        </button>
      ) : (
        <button
          onClick={() => {
            AddFavorite(productId);
          }}
          className="absolute top-0 right-0 h-6 w-6 cursor-pointer text-yellow-500"
        >
          <StarIconOutline className="h-6 w-6 text-[#FFAB57]" />
        </button>
      )}
      {icon !== true && (
        <button
          onClick={AddFavorite}
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
