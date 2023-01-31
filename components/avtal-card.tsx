import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import StarButton from "./star-button";
import AuthContent from "./AuthContent";

interface Props {
  title: string,
  slug: string,
  excerpt: string,
  categories: any,
  item: string,
  sourceUrl: string,
  className?: string,
  id?: string
}

export default function AvtalCard({ title, slug, excerpt, categories, item, sourceUrl, className, id }: Props) {
  //const [favorite, setFavorite] = useContext(MenuContext);

  const { loggedIn } = useAuth();

  return (
    <>
    <Toaster />
    <div className={`bg-[#DFEDFF] p-8 rounded-3xl mb-6 flex relative ${className}`}>
      {loggedIn ? (
        <AuthContent>
          <StarButton item={item} id={id} />
        </AuthContent>
      ) : (
        ""
      )}
      <div className="relative h-48 w-48 mr-8">
        <Image
          fill
          alt={title}
          src={sourceUrl}
          className="object-cover object-center rounded-xl"
        />
      </div>
      <div className="flex-1">
        <Link href={`/avtal/${slug}`}>
          <h2 className="text-2xl font-black mb-4">{title}</h2>
        </Link>
        <div className="mb-4" dangerouslySetInnerHTML={{ __html: excerpt }} />
        <div className="flex">
          {categories.edges?.map(({ node }) =>
            <div className="bg-blue-300 text-xs font-bold rounded-full px-4 py-1 mr-2" key={node.id}>{node.name}</div>
          )}
        </div> 
      </div>
    </div>
    </>
  )
}