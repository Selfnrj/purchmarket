import { GetStaticProps } from "next";
import Container from "../../components/container";
import { getAllPostsForHome } from "../../lib/api";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import TabLink from "../../components/tab-link";
import Breadcrumbs from "../../components/Breadcrumbs";
import NewsPanel from "../../components/news-panel";

export default function Nyheter({ allPosts }) {
  const totalCountNyhet = allPosts.edges.filter(
    (item) => item.node.categories?.edges[0].node.name === "Nyhet"
  ).length;
  const totalCountPress = allPosts.edges.filter(
    (item) => item.node.categories?.edges[0].node.name === "Press"
  ).length;
  const [postNum, setPostNum] = useState(8); // Default number of posts dislplayed

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
            <p className="hidden sm:block">
              Totalt: {totalCountNyhet} nyheter och{" "}
              {totalCountPress === 1 ? "ett" : totalCountPress} pressmeddelanden{" "}
            </p>
          </div>
          <Tab.Panels>
            <NewsPanel
              allPosts={allPosts}
              postNum={postNum}
              setPostNum={setPostNum}
            />
            <NewsPanel
              allPosts={allPosts}
              postNum={postNum}
              setPostNum={setPostNum}
              newsCategory="Nyhet"
            />
            <NewsPanel
              allPosts={allPosts}
              postNum={postNum}
              setPostNum={setPostNum}
              newsCategory="Press"
            />
          </Tab.Panels>
        </Tab.Group>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome();

  return {
    props: { allPosts, preview },
    revalidate: 5,
  };
};
