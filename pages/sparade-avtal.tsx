import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import Container from "../components/container";
import MenuContext from "../contexts/click";

export default function sparadeAvtal() {
  const [favorite, setFavorite] = useContext(MenuContext);

  const removeAvtal = (item) => {
    toast.success("Avtalet har tagits bort");
    setFavorite([...favorite.filter((block) => block !== item)]);
  }; 

  useEffect(() => {
    const data = window.localStorage.getItem('SAVE_FAVORITE');
    if (data !== null) setFavorite(JSON.parse(data))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('SAVE_FAVORITE', JSON.stringify(favorite))
  }, [favorite])

  return (
    <Container>
      <Toaster />
      <div className="mt-12 mb-8">
        <h1 className="text-7xl font-bold">Sparade avtal</h1>
        <p className="font-semibold leading-8">Här hittar du alla dina sparade avtal.</p>
      </div>
      {favorite.length ? (
        favorite?.map((item) => (
          <div 
          className="bg-[#DFEDFF] p-8 rounded-3xl mb-6 flex relative" 
          key={item.node.id}
          >
          <button onClick={() => removeAvtal(item)}>
            <TrashIcon className="absolute top-6 right-6 h-6 w-6 text-red-500"/>
          </button>
          <div className="relative h-48 w-48 mr-8">
            <Image
              fill
              alt={item.node.title}
              src={`https://purchwp.azurewebsites.net/${item.node.featuredImage.node.sourceUrl}`}
              className="object-cover object-center rounded-xl"
            />
          </div>
          <div className="flex-1">
            <Link href={`/avtal/${item.node.slug}`}>
              <h2 className="text-2xl font-bold mb-4">{item.node.title}</h2>
            </Link>
            <div className="mb-4" dangerouslySetInnerHTML={{ __html: item.node.excerpt }} />
            <div className="flex">
              {item.node.categories.edges.map(({ node }) =>
                <div className="bg-blue-300 text-xs font-bold rounded-full px-4 py-1 mr-2" key={node.id}>{node.name}</div>
              )}
            </div> 
          </div>
        </div>
        ))
      ) : (
        <p>Inga sparade avtal</p>
      )}
    </Container>
  )
}
