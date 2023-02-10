import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  category,
}) {
  return (
    <div className="mb-5 rounded-3xl bg-[#DFEDFF] p-8 last:mb-0 sm:flex">
      {coverImage && (
        <div className="relative mb-4 h-80 w-full sm:mr-5 sm:mb-0 sm:h-44 sm:w-44">
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        </div>
      )}
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
      </div>
    </div>
  );
}
