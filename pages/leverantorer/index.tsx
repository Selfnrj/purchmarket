import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import Container from "../../components/container";
import { getAllLeverantorer } from "../../lib/api";
import OmslagsBild from "../../public/omslag.jpg";

export default function leverantorer(Leverantorer) {
  return (
    <>
      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <div>
        <div className="wp-block-cover relative mb-8 flex w-full items-center justify-center">
          <div className="absolute z-20 h-full w-full bg-black bg-opacity-50" />
          <div className="relative z-30 flex flex-col text-white">
            <h1 className="mb-8 max-w-2xl text-7xl font-black leading-tight">
              Leverantörer
            </h1>
            <input
              type="text"
              className="rounded-full p-4 text-black"
              placeholder="Sök leverantör"
            />
          </div>
          <Image
            fill
            placeholder="blur"
            className="object-cover"
            alt="header bild"
            src={OmslagsBild}
          />
        </div>
        <Container>
          <div>
            {Leverantorer.edges.map(({ node }) => (
              <div
                key={node.id}
                className="mb-5 flex items-center rounded-3xl bg-[#DFEDFF] p-5"
              >
                {node.featuredImage && (
                  <div className="relative mr-8 h-48 w-48 rounded-lg bg-white">
                    <Image
                      fill
                      alt={node.title}
                      src={node.featuredImage?.node.sourceUrl}
                      className="rounded-xl object-contain object-center"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Link href={`/leverantorer/${node.slug}`}>
                    <h2 className="mb-4 text-2xl font-black">{node.title}</h2>
                  </Link>
                  <div
                    className="mb-4 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: node.content }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allLeverantorer = await getAllLeverantorer();
  return { props: allLeverantorer };
}
