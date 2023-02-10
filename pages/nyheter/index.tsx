import { GetStaticProps } from "next";
import Container from "../../components/container";
import PostPreview from "../../components/post-preview";
import { getAllPostsForHome } from "../../lib/api";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import LoadmoreButton from "../../components/loadmore-button";
import TabLink from "../../components/tab-link";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function Nyheter({ allPosts }) {
  const totalCount = allPosts.edges.length;
  const [postNum, setPostNum] = useState(3); // Default number of posts dislplayed

  return (
    <>
      <Breadcrumbs />
      <Container>
        <div className="mt-12 mb-8">
          <h1 className="text-5xl font-black sm:text-7xl">Nyheter</h1>
          <p className="text-xl leading-8">
            Här finns våra pressmeddelanden och andra nyheter.
          </p>
        </div>
        <Tab.Group>
          <div className="mb-4  flex items-center justify-between border border-transparent border-b-gray-300">
            <TabLink tablinks={["Alla", "Nyheter", "Press"]} />
            <p className="hidden sm:block">Totalt: {totalCount} nyheter </p>
          </div>

          <Tab.Panels>
            <Tab.Panel>
              {allPosts.edges.slice(0, postNum).map(({ node }) => (
                <PostPreview
                  key={node.slug}
                  title={node.title}
                  coverImage={node.featuredImage}
                  date={node.date}
                  slug={node.slug}
                  excerpt={node.excerpt}
                  category={node.categories.edges[0].node.name}
                />
              ))}
              <LoadmoreButton
                number={postNum}
                setNumber={setPostNum}
                allPosts={allPosts}
              />
            </Tab.Panel>
            <Tab.Panel>
              {allPosts.edges
                .filter(
                  (item) => item.node.categories?.edges[0].node.name === "Nyhet"
                )
                .slice(0, postNum)
                .map(({ node }) => (
                  <PostPreview
                    key={node.slug}
                    title={node.title}
                    coverImage={node.featuredImage}
                    date={node.date}
                    slug={node.slug}
                    excerpt={node.excerpt}
                    category={node.categories.edges[0].node.name}
                  />
                ))}
              <LoadmoreButton
                number={postNum}
                setNumber={setPostNum}
                allPosts={allPosts}
              />
            </Tab.Panel>
            <Tab.Panel>
              {allPosts.edges
                .filter(
                  (item) => item.node.categories?.edges[0].node.name === "Press"
                )
                .slice(0, postNum)
                .map(({ node }) => (
                  <PostPreview
                    key={node.slug}
                    title={node.title}
                    coverImage={node.featuredImage}
                    date={node.date}
                    slug={node.slug}
                    excerpt={node.excerpt}
                    category={node.categories.edges[0].node.name}
                  />
                ))}
              <LoadmoreButton
                number={postNum}
                setNumber={setPostNum}
                allPosts={allPosts}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};
