import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
    }
  }
  slug?: string
}

export default function CoverImage({ title, coverImage, slug }: Props) {
  const image = (
    <Image
      fill
      alt={`Cover Image for ${title}`}
      src={`https://purchwp.azurewebsites.net/${coverImage?.node.sourceUrl}`}
      className={cn('shadow-small', {
        'object-cover object-center rounded-xl': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/nyheter/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
