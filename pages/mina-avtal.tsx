import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Container from "../components/container";
import { getAllAvtal } from "../lib/api";

export default function MinaAvtal(allAvtal) {

  return (
    <Container>
      <div>
        <h1 className="leading-tight my-8 text-6xl font-black">Mina Avtal</h1>
        {allAvtal.edges.filter(item => item.node.author?.node.name === "").map((item) => (
          <div 
            className="bg-[#DFEDFF] p-8 rounded-3xl mb-6 flex relative" 
            key={item.node.id}  
          >
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
                <p>{item.node.author?.node.firstName} {item.node.author?.node.lastName}</p>
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
  )
}


export async function getStaticProps() {
  const allAvtal = await getAllAvtal();
  return { props: allAvtal };
}