import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  category,
}) {
  return (
    <div className="mb-5 rounded-3xl bg-[#DFEDFF] p-5 last:mb-0 sm:flex">
      <div className="mr-5">
        {coverImage && (
          <div className="relative h-48 w-48">
            <CoverImage title={title} coverImage={coverImage} slug={slug} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="mb-3 text-2xl font-black leading-snug">
          <Link
            href={`/nyheter/${slug}`}
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></Link>
        </h3>
        <div
          className="mb-4 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <div className="flex text-sm">
          {category}
          <span className="mx-1">-</span>
          <Date dateString={date} />
        </div>
        {/* <Avatar author={author} /> */}
      </div>
    </div>
  );
}
