import Image from "next/image"
import Container from "../../components/container";
import { getAllAvtal } from "../../lib/api";
import OmslagsBild from '../../public/omslag.jpg'
import AvtalCard from "../../components/avtal-card";
import useAuth from "../../hooks/useAuth";
import AvtalUtvalda from "../../components/avtal-utvalda";
import { ChangeEvent, useEffect, useState } from "react";
import PostTitle from "../../components/post-title";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Avtal(allAvtal) {
  const { loggedIn } = useAuth();
  const [filteredAvtal, setFilteredAvtal] = useState(allAvtal.edges);
  const [avtalTitles, setAvtalTitles] = useState(
    allAvtal.edges.map((item) => item.node.title.toLowerCase())
  );
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const filteredPostsTitles: string[] = [...avtalTitles].filter(
      (title) => title.indexOf(searchString.trim().toLowerCase()) !== -1
    );

    const refilteredPosts = [...allAvtal.edges].filter((item) =>
      filteredPostsTitles.includes(item.node.title.toLowerCase())
    );

    setFilteredAvtal(refilteredPosts);

  }, [searchString, avtalTitles, allAvtal.edges])

  return (
    <>
    <div className="relative wp-block-cover w-full flex items-center justify-center">
      <div className="absolute h-full w-full bg-black bg-opacity-50 z-40" />
      <div className="text-white z-40 relative flex flex-col">
          <h1 className="max-w-2xl leading-tight mb-8 text-7xl font-black">
            Hitta inköpsavtal
          </h1>
          <form action="">
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
              <MagnifyingGlassIcon className="h-6 w-6 absolute ml-3" />
              <input 
                type="text" 
                className="p-4 pl-12 text-black rounded-full w-full" 
                placeholder="Sök avtal"
                value={searchString}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setSearchString(e.target.value)
                } 
              />
            </div>
          </form>
      </div>
      <Image 
        fill
        placeholder="blur"
        className="object-cover"
        alt="header bild"
        src={OmslagsBild} />
    </div>
    <Container>
      <div className="mt-12">
        <h1 className="mb-8 text-4xl font-bold"></h1>
        {filteredAvtal.length ? (
          filteredAvtal.filter(item => item.node.avtalstyp.valjkund === "Alla").map((item) => (
            <AvtalCard 
              key={item.node.id}
              id={item.node.id}
              title={item.node.title}
              excerpt={item.node.excerpt}
              slug={item.node.slug}
              categories={item.node.categories}
              item={item}
              sourceUrl={`https://purchwp.azurewebsites.net/${item.node.featuredImage?.node.sourceUrl}`}
            />
          ))
          ) : (
          <p className="text-center">Inga avtal hittades...</p>
        )}
      </div>
    </Container>
    </>
  )
}

export async function getStaticProps() {
  const allAvtal = await getAllAvtal();
  return { props: allAvtal };
}