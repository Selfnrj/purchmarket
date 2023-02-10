import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  coverImage: {
    node: {
      sourceUrl: string;
    };
  };
  slug?: string;
}

export default function CoverImage({ title, coverImage, slug }: Props) {
  const image = (
    <Image
      fill
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className={`object-cover object-center ${slug ? "rounded-xl" : ""}`}
    />
  );
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
  );
}
