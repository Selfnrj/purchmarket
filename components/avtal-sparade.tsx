import AvtalCard from "./avtal-card";

export default function AvtalSparade({ products, favorite, setFavorite }) {
  return (
    <div>
      {products?.edges.length ? (
        products?.edges
          .filter((item) => favorite.includes(item.node.productId))
          .map((item) => (
            <AvtalCard
              key={item.node.id}
              productId={item.node.productId}
              title={item.node.title}
              excerpt={item.node.excerpt}
              slug={item.node.slug}
              categories={item.node.productCategories}
              sourceUrl={item.node.featuredImage?.node.sourceUrl}
              favorite={favorite}
              setFavorite={setFavorite}
            />
          ))
      ) : (
        <p>Inga sparade avtal</p>
      )}
    </div>
  );
}
