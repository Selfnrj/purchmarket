import { gql, useQuery } from "@apollo/client";
import AvtalCard from "./avtal-card";
import Loader from "./Loader";

const WISHLIST = gql`
  query WishList {
    getWishList {
      productIds
    }
  }
`;

export default function AvtalUtvalda({ viewer, products }) {
  const filteredProducts = products.edges.filter(
    (item) => item.node.avtalstyp.valjkund !== null
  );

  const filteredProductsWithIds = filteredProducts.filter((item) =>
    item.node.avtalstyp.valjkund?.some((item) => item.id.includes(viewer))
  );

  const { data, loading, error } = useQuery(WISHLIST);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

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
            wishList={data?.getWishList.productIds}
          />
        ))
      ) : (
        <p>Inga avtal att visa</p>
      )}
    </div>
  );
}
