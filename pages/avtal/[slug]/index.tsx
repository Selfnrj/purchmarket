import Image from "next/image";
import Container from "../../../components/container";
import { getAllAvtal, getAvtal } from "../../../lib/api";

export default function AvtalDetail(avtal) {

  return (
    <>
    <div className="relative flex items-end h-96 w-full mb-8">
      <Image
        fill
        alt={avtal.title}
        src={avtal.featuredImage?.node.sourceUrl}
        className="object-cover object-center"
      />
      <div className="bg-black bg-opacity-50 z-40 w-full pb-6 pt-12 text-white relative">
        <Container>
          <div className="flex">
            <p className="mr-1">{avtal.author?.node.firstName}</p>
            {avtal.categories?.edges.map(({ node }) => (
              <p className="relative mr-1" key={node.id}>• {node.name}</p>
            ))}
          </div>
          
          <h1 className="text-6xl font-bold mb-4 relative">{avtal.title}</h1> 
        </Container>
      </div>
    </div>
    <Container>
      <h2 className="text-4xl font-bold mb-4">Om avtalet</h2>
      <div dangerouslySetInnerHTML={{ __html: avtal.content }} />
    </Container>
    </>
  )
}

export async function getStaticProps({ params }) {
  const avtal = await getAvtal(params.slug);

  return { props: avtal };
}

export async function getStaticPaths() {
  const avtalWithSlugs = await getAllAvtal();
  return {
    paths: avtalWithSlugs.edges.map(({ node }) => `/avtal/${node.slug}`) || [],
    fallback: true,
  };
}
