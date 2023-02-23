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

  return (
    <div className={`mb-6 rounded-3xl bg-[#DFEDFF] p-8 sm:flex ${className}`}>
      <div className="relative mb-4 h-80 w-full shrink-0 sm:mb-0 sm:mr-8 sm:h-48 sm:w-48">
        <Image
          fill
          alt={title}
          src={sourceUrl}
          className="rounded-xl object-cover object-center"
        />
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
          <Link href={`/avtal/${slug}`}>
            <h2 className="mb-4 text-2xl font-black">{title}</h2>
          </Link>
        ) : (
          <Link href="/login">
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
