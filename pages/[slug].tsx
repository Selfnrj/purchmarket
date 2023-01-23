import { getAllPagesWithSlugs, getPageBySlug } from '../lib/api';
import Head from 'next/head';
import Image from "next/image";

function Page(page) {

  /* const avtal = allAvtal.edges.map(({ node }) => (
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
        <h2 className="text-2xl font-bold mb-4">{node.title}</h2>
        <div className="mb-4" dangerouslySetInnerHTML={{ __html: node.content }} />
        <div className="flex">
          {node.categories.edges.map(({node}) =>
            <div className="bg-slate-400 rounded-full px-4 py-2 mr-2" key={node.id}>{node.name}</div>
          )}
        </div>
      </div>
      <div className='mb-5 text-4xl font-bold'>{page.title}</div>
      <div
        className='text-base text-grey-darker'
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  ));  */
    

  return (
    <div className='flex flex-col p-10'>
      <Head>
        <title>{page.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='mb-5 text-4xl font-bold'>{page.title}</div>
      <div
        className='text-base text-grey-darker'
        dangerouslySetInnerHTML={{ __html: page.content }}
      ></div>
      {/* { page.uri === "/avtal/" && avtal } */}
    </div>
  );
}

export async function getStaticPaths() {
  const pagesWithSlugs = await getAllPagesWithSlugs();
  return {
    paths: pagesWithSlugs.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const page = await getPageBySlug(params.slug);
  return { props: page };
}

export default Page;