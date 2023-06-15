import AvtalCard from "./avtal-card";

export default function AvtalUtvalda({
  viewer,
  products,
  favorite,
  setFavorite,
}) {
  //const { id } = viewer;

  const filteredProducts = products.edges.filter(
    (item) => item.node.avtalstyp.valjkund !== null
  );

  console.log(filteredProducts);

  const filteredProductsWithIds = filteredProducts.filter((item) =>
    item.node.avtalstyp.valjkund?.some((item) => item.id.includes(id))
  );

  return (
    <div>
      {filteredProductsWithIds.length ? (
        filteredProductsWithIds.map((item) => (
          <AvtalCard
            key={item?.node?.id}
            productId={item?.node?.id}
            title={item?.node?.title}
            excerpt={item?.node?.excerpt}
            slug={item?.node?.slug}
            categories={item?.node?.productCategories}
            sourceUrl={item?.node?.featuredImage?.node?.sourceUrl}
            favorite={favorite}
            setFavorite={setFavorite}
          />
        ))
      ) : (
        <p>Inga avtal att visa</p>
      )}
    </div>
  );
}
