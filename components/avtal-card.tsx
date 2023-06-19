import Image from "next/image";
import Link from "next/link";
import StarButton from "./star-button";
import { useSession } from "next-auth/react";

interface Props {
  title: string;
  slug: string;
  excerpt: string;
  categories: any;
  sourceUrl?: string;
  className?: string;
  productId?: number;
  wishList?: any;
}

export default function AvtalCard({
  title,
  slug,
  excerpt,
  categories,
  sourceUrl,
  className,
  productId,
  wishList,
}: Props) {
  const { status } = useSession();

  const cardImage = (
    <Image
      fill
      priority
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      alt={title}
      src={sourceUrl}
      className="h-auto w-full rounded-xl object-cover object-center"
    />
  );

  const maxExcerptLength = 140; // Set your desired excerpt length here

  // Function to truncate the excerpt to the desired length
  const truncateExcerpt = (text) => {
    if (text.length > maxExcerptLength) {
      return `${text.substr(0, maxExcerptLength)}...`;
    }
    return text;
  };

  return (
    <div className={`mb-6 rounded-3xl bg-[#DFEDFF] p-8 md:flex ${className}`}>
      {sourceUrl !== undefined ? (
        <div className="relative mb-4 h-80 w-full shrink-0 md:mb-0 md:mr-8 md:h-48 md:w-48">
          {status === "authenticated" ? (
            <Link
              href={`/avtal/${slug}`}
              className="relative block h-full w-full"
            >
              {cardImage}
            </Link>
          ) : (
            <Link href="/login" className="relative block h-full w-full">
              {cardImage}
            </Link>
          )}
        </div>
      ) : null}
      <div className="relative w-full">
        {status === "authenticated" ? (
          <StarButton icon={true} productId={productId} wishList={wishList} />
        ) : (
          ""
        )}
        {status === "authenticated" ? (
          <Link href={`/avtal/${slug}`}>
            <h2 className="mb-4 pr-6 text-2xl font-black">{title}</h2>
          </Link>
        ) : (
          <Link href="/login">
            <h2 className="mb-4 text-2xl font-black">{title}</h2>
          </Link>
        )}
        <div
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: truncateExcerpt(excerpt) }}
        />
        <div className="flex flex-wrap">
          {categories.edges?.map(({ node }) => (
            <div
              className="mr-2 mb-2 rounded-full bg-blue-300 px-4 py-1 text-xs font-bold"
              key={node.id}
            >
              {node.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
