import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import MenuContext from "../contexts/click";
import { toast, Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

interface Props {
  title: string,
  slug: string,
  excerpt: string,
  categories: any,
  item: string,
  sourceUrl: string,
  className?: string
}

export default function AvtalCard({ title, slug, excerpt, categories, item, sourceUrl, className }: Props) {
  const [favorite, setFavorite] = useContext(MenuContext);

  const { loggedIn } = useAuth();

  const addAvtal = (item) => {
    if (!favorite.includes(item)) {
      toast.success("Avtalet är sparat");
      setFavorite([...favorite, item]);
    } else {
      toast.success("Avtalet har tagits bort");
      setFavorite([...favorite.filter((block) => block !== item)]);
    }
  };

  useEffect(() => {
    const data = window.localStorage.getItem('SAVE_FAVORITE');
    if (data !== null) setFavorite(JSON.parse(data))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('SAVE_FAVORITE', JSON.stringify(favorite))
  }, [favorite])

  return (
    <>
    <Toaster />
    <div className={`bg-[#DFEDFF] p-8 rounded-3xl mb-6 flex relative ${className}`}>
      {loggedIn ? (
        <button 
          onClick={() => addAvtal(item)}
          className="absolute top-6 right-6 h-6 w-6 text-yellow-500"
        >
          <StarIcon className="h-6 w-6 text-yellow-500"/>
        </button> 
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