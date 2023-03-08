import Image from "next/image";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import StarButton from "./star-button";
import AuthContent from "./AuthContent";

interface Props {
  title: string;
  slug: string;
  excerpt: string;
  categories: any;
  sourceUrl: string;
  className?: string;
  productId?: number;
  favorite?: number[];
  setFavorite?: any;
}

export default function AvtalCard({
  title,
  slug,
  excerpt,
  categories,
  sourceUrl,
  className,
  productId,
  favorite,
  setFavorite,
}: Props) {
  const { loggedIn } = useAuth();

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

  return (
    <div className={`mb-6 rounded-3xl bg-[#DFEDFF] p-8 sm:flex ${className}`}>
      <div className="relative mb-4 h-80 w-full shrink-0 sm:mb-0 sm:mr-8 sm:h-48 sm:w-48">
        {loggedIn ? (
          <Link
            href={`/avtal/${slug}`}
            className="relative block h-full w-full"
            rel="preload"
            as="image"
          >
            {cardImage}
          </Link>
        ) : (
          <Link
            href="/login"
            className="relative block h-full w-full"
            rel="preload"
            as="image"
          >
            {cardImage}
          </Link>
        )}
      </div>
      <div className="relative">
        {loggedIn ? (
          <AuthContent>
            <StarButton
              icon={true}
              productId={productId}
              favorite={favorite}
              setFavorite={setFavorite}
            />
          </AuthContent>
        ) : (
          ""
        )}
        {loggedIn ? (
          <Link href={`/avtal/${slug}`} rel="preload" as="image">
            <h2 className="mb-4 text-2xl font-black">{title}</h2>
          </Link>
        ) : (
          <Link href="/login" rel="preload" as="image">
            <h2 className="mb-4 text-2xl font-black">{title}</h2>
          </Link>
        )}
        <div className="mb-4" dangerouslySetInnerHTML={{ __html: excerpt }} />
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
