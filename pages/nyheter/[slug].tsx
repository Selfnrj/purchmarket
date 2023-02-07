import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Tags from "../../components/tags";
import {
  getAllPostsWithSlug,
  getPostAndMorePosts,
  getPrimaryMenu,
} from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import HeroPost from "../../components/hero-post";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function Post({ post, posts, preview }) {
  const router = useRouter();
  const heroPost = posts?.edges[0]?.node;
  const morePosts = posts?.edges.slice(1);

  //console.log("post", morePosts);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      {router.isFallback ? (
        <span>Loading…</span>
      ) : (
        <>
          <PostHeader
            title={post.title}
            coverImage={post.featuredImage}
            date={post.date}
            author={post.author}
            categories={post.categories}
          />
          <Container>
            <Breadcrumbs />
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <PostBody content={post.content} />
              {/*               <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer> */}
            </article>
            <SectionSeparator />
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-6xl font-black">Fler nyheter</h1>
              <Link
                href="/nyheter"
                className="flex items-center font-bold text-[#17375E]"
              >
                Visa alla nyheter
                <ArrowRightIcon className="ml-2 h-6 w-6 text-gray-900" />
              </Link>
            </div>
            <div className="sm:flex">
              <div className="mr-5 sm:flex-1">
                {heroPost && (
                  <HeroPost
                    title={heroPost.title}
                    coverImage={heroPost.featuredImage}
                    date={heroPost.date}
                    author={heroPost.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                    category={heroPost.categories.edges[0].node.name}
                  />
                )}
              </div>
              <div className="sm:flex-1">
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
              </div>
            </div>
          </Container>
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/nyheter/${node.slug}`) || [],
    fallback: true,
  };
};
