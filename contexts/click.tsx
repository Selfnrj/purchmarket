import { gql, useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

const CURRENT_WISHLIST = gql`
  query GetWishList {
    getWishList {
      productIds
    }
  }
`;

type ThemeContextType = any;

const MenuContext = createContext<ThemeContextType>([]);

export const ClickProvider = ({ children }) => {
  const { data, loading, error } = useQuery(CURRENT_WISHLIST);
  const [favorite, setfavorite] = useState<ThemeContextType>([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  /* useEffect(() => {
        localStorage.setItem("dataKey", JSON.stringify(favorite));
      }, [favorite]); */

  /* useEffect(() => {
        window.localStorage.setItem("SAVE_FAVORITE", JSON.stringify(favorite));
      }, [favorite]); */

  return (
    <MenuContext.Provider value={[favorite, setfavorite]}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
