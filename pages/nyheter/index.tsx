import { GetStaticProps } from "next";
import Container from "../../components/container";
import { getAllPostsForHome } from "../../lib/api";
import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import NewsPanel from "../../components/news-panel";

export default function Nyheter({ allPosts }) {
  const totalCountNyhet = allPosts.edges.length;
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
        <p className="mb-4">Totalt: {totalCountNyhet} nyheter</p>
        <NewsPanel
          allPosts={allPosts}
          postNum={postNum}
          setPostNum={setPostNum}
        />
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
