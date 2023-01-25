import { createContext, useState } from 'react';

type ThemeContextType = any;

const MenuContext = createContext<ThemeContextType>([])

export const ClickProvider = ({ children }) => {
  const [favorite, setfavorite] = useState<ThemeContextType>([]);

  return (
    <MenuContext.Provider value={[favorite, setfavorite]}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;