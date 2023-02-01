import Image from "next/image";
import AvtalCard from "../../../components/avtal-card";
import Container from "../../../components/container";
import { getAllAvtal, getAllLeverantorer, getLeverantor } from "../../../lib/api";

export default function LeverantorDetalj({ leverantor, allAvtal }) {
  return (
    <Container>
      <div className="max-w-2xl mx-auto mt-16">
        <div className="relative w-48 h-48 border rounded-lg mx-auto mb-4"> 
          <Image
            fill
            alt={leverantor?.title}
            src={`https://purchwp.azurewebsites.net/${leverantor?.featuredImage?.node?.sourceUrl}`}
            className="object-contain object-center rounded-xl"
          />
        </div>
        <h1 className="text-6xl font-bold mb-4 relative text-center">{leverantor?.title}</h1>
        <div className="mb-8 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: leverantor?.content }} />
        <h1 className="text-6xl font-bold mb-4 relative">Avtal</h1>
        {allAvtal?.edges?.filter(item => item.node.avtalstyp.valjLeverantor === leverantor?.title).map((item) => (
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

      </div>
    </Container>
  )
}

export async function getStaticProps({ params }) {
  const leverantor = await getLeverantor(params.slug);
  const allAvtal = await getAllAvtal();

  return { props: {leverantor, allAvtal} };
}

export async function getStaticPaths() {
  const leverantorWithSlugs = await getAllLeverantorer();
  return {
    paths: leverantorWithSlugs.edges.map(({ node }) => `/leverantorer/${node.slug}`) || [],
    fallback: true,
  };
}