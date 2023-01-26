import Image from "next/image"
import Link from "next/link";
import React, { useContext, useEffect } from 'react'
import Container from "../../components/container";
import { getAllAvtal } from "../../lib/api";
import { StarIcon } from '@heroicons/react/24/solid'
import { toast, Toaster } from "react-hot-toast";
import MenuContext from "../../contexts/click";
import OmslagsBild from '../../public/omslag.jpg'


export default function Avtal(allAvtal) {
  const [favorite, setFavorite] = useContext(MenuContext);

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
    <div className="relative wp-block-cover w-full flex items-center justify-center">
      <div className="absolute h-full w-full bg-black bg-opacity-50 z-40" />
      <div className="text-white z-40 relative flex flex-col">
          <h1 className="max-w-2xl leading-tight mb-8 text-7xl font-black">
            Hitta inköpsavtal
          </h1>
          <input type="text" className="p-4 text-black rounded-full" placeholder="Sök avtal" />
      </div>
      <Image 
        fill
        placeholder="blur"
        className="object-cover"
        alt="header bild"
        src={OmslagsBild} />
    </div>
    <Container>
      <Toaster />
      <div className="mt-12">
        <h1 className="mb-8 text-4xl font-bold"></h1>
        {allAvtal.edges.map((item) => (
          <div 
            className="bg-[#DFEDFF] p-8 rounded-3xl mb-6 flex relative" 
            key={item.node.id}  
          >
            <button 
              onClick={() => addAvtal(item)}
              className="absolute top-6 right-6 h-6 w-6 text-yellow-500"
            >
              <StarIcon className="h-6 w-6 text-yellow-500"/>
            </button> 
  
            <div className="relative h-48 w-48 mr-8">
              <Image
                fill
                alt={item.node.title}
                src={item.node.featuredImage.node.sourceUrl}
                className="object-cover object-center rounded-xl"
              />
            </div>
            <div className="flex-1">
              <Link href={`/avtal/${item.node.slug}`}>
                <h2 className="text-2xl font-black mb-4">{item.node.title}</h2>
              </Link>
              <div className="mb-4" dangerouslySetInnerHTML={{ __html: item.node.excerpt }} />
              <div className="flex">
                {item.node.categories.edges.map(({ node }) =>
                  <div className="bg-blue-300 text-xs font-bold rounded-full px-4 py-1 mr-2" key={node.id}>{node.name}</div>
                )}
              </div> 
            </div>
          </div>
        ))}
      </div>
    </Container>
    </>
  )
}

export async function getStaticProps() {
  const allAvtal = await getAllAvtal();
  return { props: allAvtal };
}