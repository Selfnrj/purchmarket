import { gql, useQuery } from "@apollo/client";
import AvtalCard from "./avtal-card";

const CURRENT_WISHLIST = gql`
  query GetWishList {
    getWishList {
      productIds
    }
  }
`;

export default function AvtalSparade({ allAvtal }) {
  const { data } = useQuery(CURRENT_WISHLIST);

  const wishlist = data?.getWishList.productIds;

  return (
    <div>
      {allAvtal?.edges.length ? (
        allAvtal?.edges
          .filter((item) => wishlist?.includes(item.node.productId))
          .map((item) => (
            <AvtalCard
              key={item.node.id}
              productId={item.node.productId}
              title={item.node.title}
              excerpt={item.node.excerpt}
              slug={item.node.slug}
              categories={item.node.productCategories}
              sourceUrl={item.node.featuredImage?.node.sourceUrl}
            />
          ))
      ) : (
        <p>Inga sparade avtal</p>
      )}
    </div>
  );
}
