import React from "react";
import useAuth, { User } from "../hooks/useAuth";
import AvtalCard from "./avtal-card";

export default function AvtalUtvalda({ allAvtal }) {
  const { user } = useAuth();
  const { firstName } = user as User;

  return (
    <div>
      {allAvtal.edges
        .filter((item) => item.node.avtalstyp.valjkund === firstName)
        .map((item) => (
          <AvtalCard
            key={item.node.id}
            id={item.node.id}
            title={item.node.title}
            excerpt={item.node.excerpt}
            slug={item.node.slug}
            categories={item.node.categories}
            item={item}
            sourceUrl={item.node.featuredImage.node.sourceUrl}
          />
        ))}
    </div>
  );
}
