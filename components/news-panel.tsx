import { Tab } from "@headlessui/react";
import LoadmoreButton from "./loadmore-button";
import PostPreview from "./post-preview";

type Props = {
  allPosts: any;
  postNum: number;
  setPostNum: any;
  newsCategory?: string;
};

export default function NewsPanel({
  allPosts,
  postNum,
  setPostNum,
  newsCategory,
}: Props) {
  return (
    <Tab.Panel>
      {allPosts.edges
        .filter(
          (item) =>
            item.node.categories?.edges[0].node.name === newsCategory ||
            newsCategory === undefined
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
      {postNum <
        allPosts?.edges.filter(
          (item) =>
            item.node.categories?.edges[0].node.name === newsCategory ||
            newsCategory === undefined
        ).length && <LoadmoreButton postNum={postNum} setNumber={setPostNum} />}
    </Tab.Panel>
  );
}
