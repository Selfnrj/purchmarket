import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AvtalCard from "./avtal-card";

export default function AvtalSparade({ allAvtal, favorite, setFavorite }) {
  return (
    <>
      <div>
        {allAvtal?.edges.length ? (
          allAvtal?.edges
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
      <div className="my-16 rounded-3xl bg-[#FFDCB8] px-16 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="mb-2 text-4xl font-black leading-tight">
            Relaterade avtal
          </h1>
          <Link
            href="/avtal"
            className="flex items-center font-bold text-[#17375E]"
          >
            Visa alla avtal
            <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {allAvtal?.edges
            /* .filter((item) => item.node.avtalstyp.valjkund === "Alla") */

            .filter(
              (item) =>
                !favorite.includes(item.node.productId) &&
                item.node.avtalstyp.synligtKund === null
            )
            .slice(0, 2)
            .map((item) => (
              <AvtalCard
                className="bg-white shadow-lg"
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
            ))}
        </div>
      </div>
    </>
  );
}
