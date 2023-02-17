import { gql, useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

type ThemeContextType = any;

const MenuContext = createContext<ThemeContextType>([]);

const CURRENT_WISHLIST = gql`
  query GetWishList {
    getWishList {
      productIds
    }
  }
`;

export const ClickProvider = ({ children }) => {
  const { data } = useQuery(CURRENT_WISHLIST);
  const wishlist = data?.getWishList?.productIds;
  const [favorite, setfavorite] = useState<ThemeContextType>(wishlist);

  console.log("wishlist", wishlist);

  /* useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(favorite));
  }, [favorite]); */

  useEffect(() => {
    window.localStorage.setItem("SAVE_FAVORITE", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <MenuContext.Provider value={[favorite, setfavorite]}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
