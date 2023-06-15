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

export default function AvtalSparade({ products }) {
  const { data, loading, error } = useQuery(WISHLIST);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.getWishList.productIds.length > 0 ? (
        products?.edges
          .filter((item) =>
            data?.getWishList.productIds.includes(item.node.productId)
          )
          .map((item) => (
            <AvtalCard
              key={item.node.id}
              productId={item.node.productId}
              title={item.node.title}
              excerpt={item.node.excerpt}
              slug={item.node.slug}
              categories={item.node.productCategories}
              sourceUrl={item.node.featuredImage?.node.sourceUrl}
              wishList={data?.getWishList.productIds}
            />
          ))
      ) : (
        <p>Inga sparade avtal</p>
      )}
    </div>
  );
}
