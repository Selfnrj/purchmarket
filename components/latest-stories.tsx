import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import HeroPost from "./hero-post";
import MoreStories from "./more-stories";

export default function LatestStories({ allPosts: { edges } }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1, 4);

  return (
    <section className="my-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-5xl font-black">Nyheter</h1>
        <Link
          href="/nyheter"
          className="flex items-center font-bold text-[#17375E]"
        >
          Visa alla nyheter
          <ArrowRightIcon className="ml-2 h-6 w-6 text-gray-900" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            category={heroPost.categories.edges[0].node.name}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </div>
    </section>
  );
}
