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
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className={`h-auto w-full object-cover object-center ${
        slug ? "rounded-xl" : ""
      }`}
    />
  );
  return (
    <Link
      rel="preload"
      as="image"
      className="relative block h-full w-full"
      href={`/nyheter/${slug}`}
      aria-label={title}
    >
      {image}
    </Link>
  );
}
