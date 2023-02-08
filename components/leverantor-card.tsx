import Image from "next/image";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

type Props = {
  id?: string;
  title: string;
  content: string;
  featuredImage: any;
  slug: string;
};

export default function LeverantorCard({
  id,
  title,
  content,
  featuredImage,
  slug,
}: Props) {
  const { loggedIn } = useAuth();

  return (
    <div
      key={id}
      className="mb-5 flex items-center rounded-3xl bg-[#DFEDFF] p-5"
    >
      {featuredImage && (
        <div className="relative mr-8 h-48 w-48 rounded-lg bg-white">
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
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
