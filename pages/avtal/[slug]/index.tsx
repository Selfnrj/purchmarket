import Image from "next/image";
import Container from "../../../components/container";
import { getAllAvtal, getAvtal } from "../../../lib/api";
import FileDownloader from "../../../components/FileDownloader";
import { filesize } from "filesize";
import Link from "next/link";
import useAuth from "../../../hooks/useAuth";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function AvtalDetail(product) {
  //const size = filesize(avtal.avtalPdf?.pdf?.fileSize);
  const { loggedIn } = useAuth();

  return (
    <>
      <div className="relative mb-8 flex h-96 w-full items-end">
        <Image
          fill
          priority
          alt={product.title}
          src={product.featuredImage?.node.sourceUrl}
          className="object-cover object-center"
        />
        <div className="relative z-40 w-full bg-black bg-opacity-50 pb-6 pt-12 text-white">
          <Container>
            <div className="flex">
              {/* <p className="mr-1">{product.author?.node.firstName}</p> */}
              {product.categories?.edges.map(({ node }) => (
                <p className="relative mr-1" key={node.id}>
                  {node.name}{" "}
                </p>
              ))}
            </div>

            <h1 className="relative mb-4 text-6xl font-bold">
              {product.title}
            </h1>
          </Container>
        </div>
      </div>
      <Container>
        <h2 className="mb-4 text-4xl font-bold">Om avtalet</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
            {loggedIn ? (
              <Link
                href="/kundnummer"
                className="flex items-center font-bold text-[#17375E]"
              >
                Se mina kundnummer
                <ArrowRightIcon className="ml-2 h-6 w-6 text-gray-900" />
              </Link>
            ) : (
              ""
            )}
            {product.file?.pdf?.title && (
              <div className="mt-8 border border-transparent border-t-gray-300">
                <FileDownloader
                  title={product.file?.pdf?.title}
                  url={product.file?.pdf?.mediaItemUrl}
                  size={product.file?.pdf?.fileSize}
                />
              </div>
            )}
          </div>
          <div>
            <div className="rounded-lg bg-[#DFEDFF] p-8">
              <h3 className="mb-4 text-xl font-bold">Kontakt</h3>
              <ul className="flex flex-wrap">
                <li className="mr-8 w-6/12 py-2">Namn:</li>
                <li className="py-2 font-semibold">
                  {product.avtalsinfo?.namn}
                </li>
                <li className="mr-8 w-6/12 py-2">Telefonnummer:</li>
                <li className="py-2 font-semibold">
                  {product.avtalsinfo?.telefonnummer}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps({ params }) {
  const product = await getAvtal(params.slug);

  return { props: product };
}

export async function getStaticPaths() {
  const avtalWithSlugs = await getAllAvtal();
  return {
    paths: avtalWithSlugs.edges.map(({ node }) => `/avtal/${node.slug}`) || [],
    fallback: true,
  };
}
