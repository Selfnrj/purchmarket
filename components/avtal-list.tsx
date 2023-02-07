import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AvtalCard from "./avtal-card";

export default function AvtalList({ products, rubrik }) {
  return (
    <div className="my-16 rounded-3xl bg-[#FFDCB8] px-16 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-2 text-4xl font-black leading-tight">{rubrik}</h1>
        <Link
          href="/avtal"
          className="flex items-center font-bold text-[#17375E]"
        >
          Visa alla avtal
          <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {products?.edges
          /* .filter((item) => item.node.avtalstyp.valjkund === "Alla") */
          .filter((item) => item.node.avtalstyp.synligtKund === null)
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
            />
          ))}
      </div>
    </div>
  );
}
