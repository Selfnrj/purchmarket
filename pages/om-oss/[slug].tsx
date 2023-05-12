import { getAllPagesWithSlugs, getPageBySlug } from "../../lib/api";
import Head from "next/head";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function OmossPage({ page }) {
  /*   
  const router = useRouter();

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  } */

  return (
    <div>
      <Breadcrumbs />
      <Head>
        <title>{page?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className='mb-5 text-4xl font-bold'>{page?.title}</div> */}
      <div
        className="content text-grey-darker text-base"
        dangerouslySetInnerHTML={{ __html: page?.content }}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const pagesWithSlugs = await getAllPagesWithSlugs();
  return {
    paths: pagesWithSlugs.edges.map(({ node }) => `/om-oss/${node.slug}`) || [],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = await getPageBySlug(params.slug);

  return {
    props: { page },
    revalidate: 5,
  };
}
