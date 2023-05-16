import useAuth, { User } from "../hooks/useAuth";
import AvtalCard from "./avtal-card";

export default function AvtalUtvalda({ favorite, setFavorite, products }) {
  const { user } = useAuth();
  const { id } = user as User;

  const filteredProducts = products.edges.filter(
    (item) => item.node.avtalstyp.valjkund !== null
  );

  const filteredProductsWithIds = filteredProducts.filter((item) =>
    item.node.avtalstyp.valjkund?.some((item) => item.id.includes(id))
  );

  console.log(filteredProductsWithIds);

  return (
    <div>
      {filteredProductsWithIds.length ? (
        filteredProductsWithIds.map((item) => (
          <AvtalCard
            key={item.node.id}
            productId={item.node.id}
            title={item.node.title}
            excerpt={item.node.excerpt}
            slug={item.node.slug}
            categories={item.node.productCategories}
            sourceUrl={item.node.featuredImage.node.sourceUrl}
            favorite={favorite}
            setFavorite={setFavorite}
          />
        ))
      ) : (
        <p>Inga utvalda avtal</p>
      )}
    </div>
  );
}
