import Image from "next/image";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

type Props = {
  id?: string;
  title: string;
  excerpt: string;
  featuredImage: any;
  slug: string;
};

export default function LeverantorCard({
  id,
  title,
  featuredImage,
  slug,
  excerpt,
}: Props) {
  const { loggedIn } = useAuth();

  return (
    <div
      key={id}
      className="mb-5 items-center rounded-3xl bg-[#DFEDFF] p-5 sm:flex"
    >
      {featuredImage && (
        <div className="relative mb-4 h-80 w-80 rounded-xl bg-white sm:mb-0 sm:mr-8 sm:h-48 sm:w-48">
          <Image
            fill
            alt={title}
            src={featuredImage}
            className="rounded-xl object-contain object-center"
          />
        </div>
      )}
      <div className="flex-1">
        {loggedIn ? (
          <Link href={`/leverantorer/${slug}`}>
            <h2 className="mb-4 text-2xl font-black">{title}</h2>
          </Link>
        ) : (
          <Link href="/login">
            <h2 className="mb-4 text-2xl font-black">{title}</h2>
          </Link>
        )}
        <div
          className="mb-4 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </div>
    </div>
  );
}
