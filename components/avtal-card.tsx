import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
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

  return (
    <>
      <Toaster />
      <div
        className={`relative mb-6 flex rounded-3xl bg-[#DFEDFF] p-8 ${className}`}
      >
        {loggedIn ? (
          <AuthContent>
            <StarButton icon={true} productId={productId} />
          </AuthContent>
        ) : (
          ""
        )}
        <div className="relative mr-8 h-48 w-48">
          <Image
            fill
            alt={title}
            src={sourceUrl}
            className="rounded-xl object-cover object-center"
          />
        </div>
        <div className="flex-1">
          <Link href={`/avtal/${slug}`}>
            <h2 className="mb-4 text-2xl font-black">{title}</h2>
          </Link>
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
    </>
  );
}
