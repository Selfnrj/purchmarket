import Image from "next/image";
import Link from "next/link";
import Container from "../../components/container";
import { getAllLeverantorer } from "../../lib/api";
import OmslagsBild from '../../public/omslag.jpg'

export default function leverantorer(Leverantorer) {
  return (
    <>
    <div className="relative wp-block-cover mb-8 w-full flex items-center justify-center">
      <div className="absolute h-full w-full bg-black bg-opacity-50 z-40" />
      <div className="text-white z-40 relative flex flex-col">
          <h1 className="max-w-2xl leading-tight mb-8 text-7xl font-black">
            Leverantörer
          </h1>
          <input type="text" className="p-4 text-black rounded-full" placeholder="Sök leverantör" />
      </div>
      <Image 
        fill
        placeholder="blur"
        className="object-cover"
        alt="header bild"
        src={OmslagsBild} />
    </div>
    <Container>
      <div>
        {Leverantorer.edges.map(({ node }) => (
          <div key={node.id} className="flex items-center bg-[#DFEDFF] mb-5 p-5 rounded-3xl">
            {node.featuredImage && (
              <div className="relative w-48 h-48 mr-8 bg-white rounded-lg"> 
                <Image
                  fill
                  alt={node.title}
                  src={`https://purchwp.azurewebsites.net/${node.featuredImage?.node.sourceUrl}`}
                  className="object-contain object-center rounded-xl"
                />
              </div>
            )}
            <div className="flex-1">
              <Link href={`/leverantorer/${node.slug}`}>
                <h2 className="text-2xl font-black mb-4">{node.title}</h2>
              </Link>
              <div
                className="text-lg leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: node.content }}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
    </>
  )
}

export async function getStaticProps() {
  const allLeverantorer = await getAllLeverantorer();
  return { props: allLeverantorer };
}