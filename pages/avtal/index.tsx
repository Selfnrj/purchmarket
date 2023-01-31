import Image from "next/image"
import Container from "../../components/container";
import { getAllAvtal } from "../../lib/api";
import OmslagsBild from '../../public/omslag.jpg'
import AvtalCard from "../../components/avtal-card";
import useAuth from "../../hooks/useAuth";
import AvtalUtvalda from "../../components/avtal-utvalda";

export default function Avtal(allAvtal) {
  const { loggedIn } = useAuth();

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
      <div className="mt-12">
        <h1 className="mb-8 text-4xl font-bold"></h1>
          {allAvtal.edges.filter(item => item.node.avtalstyp.valjkund === "Alla").map((item) => (
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
          ))}
          {loggedIn ? <AvtalUtvalda allAvtal={allAvtal}/> : ""}
      </div>
    </Container>
    </>
  )
}

export async function getStaticProps() {
  const allAvtal = await getAllAvtal();
  return { props: allAvtal };
}