﻿import { getAllPagesWithSlugs, getPageBySlug, getPrimaryMenu } from '../lib/api';
import Head from 'next/head';

function Page({ page }) {    
  return (
    <div className='flex flex-col p-10'>
      <Head>
        <title>{page?.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='mb-5 text-4xl font-bold'>{page?.title}</div>
      <div
        className='text-base text-grey-darker'
        dangerouslySetInnerHTML={{ __html: page?.content }}
      ></div>
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
  const menuItems = await getPrimaryMenu()

  return {
    props: { page, menuItems },
    revalidate: 10,
  }
}

export default Page;