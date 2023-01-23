import Image from "next/image";
import Container from "../../../components/container";
import Layout from "../../../components/layout";
import { getAllAvtal, getAvtal } from "../../../lib/api";

export default function AvtalDetail(avtal) {

  return (
    <Layout>
      <div className="relative h-96 w-full mb-8">
        <Image
          fill
          alt={avtal.title}
          src={avtal.featuredImage?.node.sourceUrl}
          className="object-cover object-center"
        />
      </div>
      <Container>
        <h1 className="text-4xl font-bold mb-4">{avtal.title}</h1> 
        <div dangerouslySetInnerHTML={{ __html: avtal.content }} />
      </Container>
    </Layout>
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
