import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import Loader from "./Loader";
import AvtalListFilter from "./avtal-list-filter";
import { PRODUCTS } from "../lib/getProducts";

type Props = {
  rubrik: string;
  productId?: string;
};

export default function AvtalList({ rubrik, productId }: Props) {
  const {
    data: productsData,
    loading: productLoading,
    error: productError,
  } = useQuery(PRODUCTS);

  if (productLoading) return <Loader />;
  if (productError) return <p>Error: {productError.message}</p>;

  return (
    <div className="my-16 rounded-3xl bg-[#FFDCB8] p-8 sm:p-16">
      <div className="mb-6 items-center justify-between sm:flex">
        <h1 className="mb-2 text-4xl font-black leading-tight">{rubrik}</h1>
        <Link
          href="/avtal"
          className="flex items-center font-bold text-[#17375E]"
        >
          Visa alla avtal
          <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
        </Link>
      </div>
      <AvtalListFilter products={productsData.products} productId={productId} />
    </div>
  );
}
