import Image from "next/image";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import StarButton from "./star-button";
import AuthContent from "./AuthContent";
import { gql, useQuery } from "@apollo/client";

const CURRENT_WISHLIST = gql`
  query GetWishList {
    getWishList {
      productIds
    }
  }
`;

interface Props {
  title: string;
  slug: string;
  excerpt: string;
  categories: any;
  sourceUrl: string;
  className?: string;
  productId?: number;
}

export default function AvtalCard({
  title,
  slug,
  excerpt,
  categories,
  sourceUrl,
  className,
  productId,
}: Props) {
  //const [favorite, setFavorite] = useContext(MenuContext);

  const { loggedIn } = useAuth();
  const { data } = useQuery(CURRENT_WISHLIST);

  return (
    <div className={`mb-6 rounded-3xl bg-[#DFEDFF] p-8 sm:flex ${className}`}>
      <div className="relative mb-4 h-80 w-full sm:mb-0 sm:mr-8 sm:h-48 sm:w-48">
        <Image
          fill
          alt={title}
          src={sourceUrl}
          className="rounded-xl object-cover object-center"
        />
      </div>
      <div className="relative flex-1">
        {loggedIn ? (
          <AuthContent>
            {data && (
              <StarButton icon={true} productId={productId} data={data} />
            )}
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
        <div className="flex">
          {categories.edges?.map(({ node }) => (
            <div
              className="mr-2 rounded-full bg-blue-300 px-4 py-1 text-xs font-bold"
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
