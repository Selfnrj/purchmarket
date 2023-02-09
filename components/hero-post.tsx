import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  category,
  slug,
}) {
  return (
    <section className="p-8">
      <div className="mb-6">
        {coverImage && (
          <div className="relative h-80 w-full sm:h-96">
            <CoverImage title={title} coverImage={coverImage} slug={slug} />
          </div>
        )}
      </div>
      <div>
        <div>
          <h3 className="mb-6 text-2xl font-black leading-tight sm:text-4xl">
            <Link
              href={`/nyheter/${slug}`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}
            ></Link>
          </h3>
        </div>
        <div>
          <div
            className="mb-4 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          {/* <Avatar author={author} /> */}
        </div>
        <div className="flex text-sm">
          {category}
          <span className="mx-1">-</span>
          <Date dateString={date} />
        </div>
      </div>
    </section>
  );
}
