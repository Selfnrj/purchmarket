import { getAllAvtal, getAllPagesWithSlugs, getPageBySlug, getPrimaryMenu } from '../lib/api';
import Head from 'next/head';
import Layout from "../components/layout";
import Header from "../components/header";
import Container from "../components/container";
import Image from "next/image";

export default function Page({ page, preview, menuItems, allAvtal }) {

  const avtal = allAvtal.edges.map(({ node }) => (
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
    </div>
  ));

  return (
    <Layout preview={preview}>
      <Header menuItems={menuItems} />
      <Container>
        <Head>
          <title>{page.title}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className="py-8">
          <h1 className='mb-5 text-4xl font-bold'>{page.title}</h1>
          <div
            className='text-base text-grey-darker'
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
          {page.uri === "/avtal/" && avtal }
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const page = await getPageBySlug(params.slug);
  const menuItems = await getPrimaryMenu();
  const allAvtal = await getAllAvtal();

  return { props: {
    page,
    menuItems,
    allAvtal,
  } };
}

export async function getStaticPaths() {
  const pagesWithSlugs = await getAllPagesWithSlugs();
  return {
    paths: pagesWithSlugs.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  };
}