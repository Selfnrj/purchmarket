import { gql, useQuery } from "@apollo/client";
import { atom } from "jotai";
import Loader from "../components/Loader";

const CURRENT_WISHLIST = gql`
  query GetWishList {
    getWishList {
      productIds
    }
  }
`;

const { data, loading, error } = useQuery(CURRENT_WISHLIST);

export const myQueryDataAtom = atom((get) => {
  if (data) {
    return data.getWishList?.productIds;
  }
  return <Loader />; // returns a promise
});
