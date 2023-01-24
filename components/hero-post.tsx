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
  slug,
}) {
  return (
    <section className="bg-[#DFEDFF] p-12 rounded-3xl">
      <div className="mb-5">
        {coverImage && (
          <div className="relative w-full h-96"> 
            <CoverImage title={title} coverImage={coverImage} slug={slug} />
          </div>
        )}
      </div>
      <div>
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link
              href={`/posts/${slug}`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}
            ></Link>
          </h3>
        </div>
        <div>
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          {/* <Avatar author={author} /> */}
        </div>
        <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
      </div>
    </section>
  )
}
