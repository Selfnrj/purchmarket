import PostPreview from "./post-preview";

export default function MoreStories({ posts }) {
  return (
    <section>
      <div>
        {posts.map(({ node }) => (
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
      </div>
    </section>
  );
}
