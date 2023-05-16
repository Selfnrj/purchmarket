import useAuth, { User } from "../hooks/useAuth";
import AvtalCard from "./avtal-card";

export default function AvtalFilterlistLogout({
  filteredAvtal,
  isAllCategory,
  postNum,
  filtercategories,
  favorite,
  setFavorite,
}) {
  return (
    <div>
      {filteredAvtal.length ? (
        filteredAvtal
          .filter((item) => {
            return item.node.avtalstyp.valjkund === null;
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
                  setFavorite={setFavorite}
                  favorite={favorite}
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
                  setFavorite={setFavorite}
                  favorite={favorite}
                />
              );
            }
          })
      ) : (
        <p className="text-center">Inga avtal hittades...</p>
      )}
    </div>
  );
}
