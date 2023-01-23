import Image from "next/image"
import Link from "next/link";
import React from 'react'
import Container from "../../components/container";
import { getAllAvtal } from "../../lib/api";

export default function Avtal(allAvtal) {
  return (
    <Container>
      {allAvtal.edges.map(({ node }) => (
        <div className="bg-[#DFEDFF] p-8 rounded-3xl mb-6 flex" key={node.id}>
          <div className="relative h-48 w-48 mr-8">
            <Image
              fill
              alt={node.title}
              src={node.featuredImage.node.sourceUrl}
              className="object-cover object-center rounded-xl"
            />
          </div>
          <div className="flex-1">
            <Link href={`/avtal/${node.slug}`}>
              <h2 className="text-2xl font-bold mb-4">{node.title}</h2>
            </Link>
            <div className="mb-4" dangerouslySetInnerHTML={{ __html: node.content }} />
            <div className="flex">
              {node.categories.edges.map(({node}) =>
                <div className="bg-slate-400 rounded-full px-4 py-2 mr-2" key={node.id}>{node.name}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </Container>
  )
}

export async function getStaticProps() {
  const allAvtal = await getAllAvtal();
  return { props: allAvtal };
}