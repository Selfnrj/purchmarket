import {
  getAllPagesWithSlugs,
  getPageBySlug,
  getPrimaryMenu,
} from "../lib/api";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../components/container";
import { useRouter } from "next/router";

function Page({ page }) {
  const router = useRouter();

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="flex flex-col p-10">
      <Head>
        <title>{page?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className='mb-5 text-4xl font-bold'>{page?.title}</div> */}
      <Container>
        <div
          className="text-grey-darker text-base"
          dangerouslySetInnerHTML={{ __html: page?.content }}
        />
      </Container>
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
  const menuItems = await getPrimaryMenu();

  return {
    props: { page, menuItems },
    revalidate: 10,
  };
}

export default Page;
