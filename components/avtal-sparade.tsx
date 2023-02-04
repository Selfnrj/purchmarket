import useAuth, { User } from "../hooks/useAuth";
import AvtalCard from "./avtal-card";

export default function AvtalSparade({ allAvtal }) {
  const { user } = useAuth();
  const { email } = user as User;

  const tag = allAvtal?.edges
    ?.filter((item) => item.node.tags.edges[0]?.node.name === email)
    .map((item) => item.node.title);

  console.log(tag);

  return (
    <div>
      {tag.length ? (
        allAvtal?.edges
          .filter((item) => item.node.tags.edges[0]?.node.name === email)
          .map((item) => (
            <AvtalCard
              key={item.node.id}
              id={item.node.id}
              title={item.node.title}
              excerpt={item.node.excerpt}
              slug={item.node.slug}
              categories={item.node.categories}
              item={item}
              sourceUrl={item.node.featuredImage?.node.sourceUrl}
            />
          ))
      ) : (
        <p>Inga sparade avtal</p>
      )}
    </div>
  );
}
