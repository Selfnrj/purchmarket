export default function PostBody({ content }) {
  return (
    <div className="content mx-auto max-w-2xl">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
