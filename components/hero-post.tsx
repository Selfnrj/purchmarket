import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

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
    <section className="bg-[#DFEDFF] p-12 rounded-3xl">
      <div className="mb-6">
        {coverImage && (
          <div className="relative w-full h-96"> 
            <CoverImage title={title} coverImage={coverImage} slug={slug} />
          </div>
        )}
      </div>
      <div>
        <div>
          <h3 className="mb-6 text-2xl lg:text-6xl font-black leading-tight">
            <Link
              href={`/posts/${slug}`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}
            ></Link>
          </h3>
        </div>
        <div>
          <div
            className="leading-relaxed text-lg mb-4"
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
  )
}
