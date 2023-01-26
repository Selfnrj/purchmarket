import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  category
}) {
  return (
    <div className="flex bg-[#DFEDFF] mb-5 p-5 rounded-3xl">
      <div className="mr-5">
        {coverImage && (
          <div className="relative w-48 h-48"> 
            <CoverImage title={title} coverImage={coverImage} slug={slug} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-black mb-3 leading-snug">
          <Link
            href={`/nyheter/${slug}`}
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></Link>
        </h3>
        <div
          className="leading-relaxed mb-4"
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
  )
}
