import Image from "next/image";
import Container from "../../../components/container";
import { getAllAvtal, getAvtal, getWishList } from "../../../lib/api";
import FileDownloader from "../../../components/FileDownloader";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import StarButton from "../../../components/star-button";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Script from "next/script";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../../components/Loader";
import AvtalList from "../../../components/avtal-list";

const WISHLIST = gql`
  query WishList {
    getWishList {
      productIds
    }
  }
`;

export default function AvtalDetail({ product, products, wishList }) {
  const { data, loading, error } = useQuery(WISHLIST);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  //const size = filesize(avtal.avtalPdf?.pdf?.fileSize);
  const { status } = useSession();

  return (
    <>
      {product?.title === "Resor – SJ" ? (
        <Head>
          <script src="https://www.sj.se/microsite-widget/microsite-widget.min.js"></script>
        </Head>
      ) : null}

      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <Toaster />
      <div
        className={`${
          product?.avtalsinfo?.avtalsbild !== null ? "wp-block-cover" : "h-96"
        } relative mb-16 flex w-full items-center`}
      >
        {product?.avtalsinfo?.avtalsbild !== null ? (
          <>
            <div className="absolute z-20 h-full w-full bg-black bg-opacity-50" />
            <Image
              fill
              priority
              alt={product?.title}
              src={product?.avtalsinfo?.avtalsbild?.sourceUrl}
              className="object-cover object-center"
            />
          </>
        ) : (
          <div className="absolute z-20 h-full w-full bg-[#111827]" />
        )}

        <div className="absolute bottom-0 z-30 w-full pb-6 pt-12 text-white">
          <Container>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex">
                  {/* <p className="mr-1">{product.author?.node.firstName}</p> */}
                  {product?.categories?.edges.map(({ node }) => (
                    <p className="relative mr-1" key={node.id}>
                      {node.name}{" "}
                    </p>
                  ))}
                </div>
                <h1 className="relative mb-4 text-6xl font-bold">
                  {product?.title}
                </h1>
              </div>
              {status === "authenticated" ? (
                <StarButton
                  icon={false}
                  productId={product.productId}
                  wishList={data?.getWishList.productIds}
                />
              ) : (
                ""
              )}
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <h2 className="mb-4 text-4xl font-bold">Om avtalet</h2>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8">
            <div
              className="content mb-8"
              dangerouslySetInnerHTML={{ __html: product?.content }}
            />
            {product?.title === "Resor – SJ" ? (
              <>
                <div id="sj-widget"></div>
                <Script
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `(function(root) {
                      var SJ = root.SJ;
                      var configuration = {
                        micrositeId: "2aa09860-c034-4db9-87b5-340cfc053e44",
                        language: "sv"
                      };
                      SJ.widget.init(configuration);
                    }(this));`,
                  }}
                />
              </>
            ) : null}
            {status === "authenticated" ? (
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
            {product?.file?.pdf?.title && (
              <div className="mt-8 border border-transparent border-t-gray-300">
                <FileDownloader
                  title={product?.file?.pdf?.title}
                  url={product?.file?.pdf?.mediaItemUrl}
                  size={product?.file?.pdf?.fileSize}
                />
              </div>
            )}
          </div>
          <div className="col-span-6 lg:col-span-5 xl:col-span-4">
            {product?.avtalsinfo?.namn && (
              <div className="rounded-lg bg-[#DFEDFF] p-8">
                <h3 className="mb-4 text-xl font-bold">Kontaktinformation</h3>
                <ul className="mb-8 flex flex-wrap">
                  {product?.avtalsinfo?.namn && ( // if product.avtalsinfo.namn exists
                    <>
                      <li className="w-5/12 py-2 font-bold">Namn</li>
                      <li className="w-7/12 py-2">
                        {product?.avtalsinfo?.namn}
                      </li>
                    </>
                  )}
                  {product?.avtalsinfo?.adress && ( // if product.avtalsinfo.adress exists
                    <>
                      <li className="w-5/12 py-2 font-bold">Adress</li>
                      <li className="w-7/12 py-2">
                        {product?.avtalsinfo?.adress}
                      </li>
                    </>
                  )}
                </ul>
                {product?.avtalsinfo?.kundtjanstTelefonnummer && (
                  <h3 className="mb-4 text-xl font-bold">Kundtjänst</h3>
                )}
                <ul className="mb-8 flex flex-wrap">
                  {product?.avtalsinfo?.kundtjanstTelefonnummer && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Telefonnummer</li>
                      <li className="w-7/12 py-2">
                        {product?.avtalsinfo?.kundtjanstTelefonnummer}
                      </li>
                    </>
                  )}
                  {product?.avtalsinfo?.kundtjanstEmail && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Email</li>
                      <li className="w-7/12 py-2">
                        <a
                          className="underline"
                          href={`mailto:${product?.avtalsinfo?.kundtjanstEmail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product?.avtalsinfo?.kundtjanstEmail}
                        </a>
                      </li>
                    </>
                  )}
                  {product?.avtalsinfo?.orderEmail && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Order email</li>
                      <li className="w-7/12 py-2">
                        <a
                          className="underline"
                          href={`mailto:${product?.avtalsinfo?.orderEmail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product?.avtalsinfo?.orderEmail}
                        </a>
                      </li>
                    </>
                  )}
                  {product?.avtalsinfo?.webbshop && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Webbshop</li>
                      <li className="w-7/12 py-2">
                        <a
                          className="underline"
                          href={product?.avtalsinfo?.webbshop}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product?.avtalsinfo?.webbshop}
                        </a>
                      </li>
                    </>
                  )}
                  {product?.avtalsinfo?.hemsida && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Hemsida</li>
                      <li className="w-7/12 py-2">
                        <a
                          className="underline"
                          href={product?.avtalsinfo?.hemsida}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product?.avtalsinfo?.hemsida}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
                {product?.avtalsinfo?.kontaktpersonNamn && (
                  <h3 className="mb-4 text-xl font-bold">Kontaktperson</h3>
                )}
                <ul className="flex flex-wrap">
                  {product?.avtalsinfo?.kontaktpersonNamn && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Namn</li>
                      <li className="w-7/12 py-2">
                        {product?.avtalsinfo?.kontaktpersonNamn}
                      </li>
                    </>
                  )}
                  {product?.avtalsinfo?.kontaktpersonRoll && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Roll</li>
                      <li className="w-7/12 py-2">
                        {product?.avtalsinfo?.kontaktpersonRoll}
                      </li>
                    </>
                  )}
                  {product?.avtalsinfo?.kontaktpersonEmail && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Email</li>
                      <li className="w-7/12 py-2">
                        <a
                          className="underline"
                          href={`mailto:${product?.avtalsinfo?.kontaktpersonEmail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product?.avtalsinfo?.kontaktpersonEmail}
                        </a>
                      </li>
                    </>
                  )}
                  {product?.avtalsinfo?.kontaktpersonTelefonnummer && (
                    <>
                      <li className="w-5/12 py-2 font-bold">Telefonnummer</li>
                      <li className="w-7/12 py-2">
                        <a
                          className="underline"
                          href={`tel:${product?.avtalsinfo?.kontaktpersonTelefonnummer}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product?.avtalsinfo?.kontaktpersonTelefonnummer}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <AvtalList rubrik="Relaterade avtal" productId={product.productId} />
      </Container>
    </>
  );
}

export async function getStaticProps({ params }) {
  const product = await getAvtal(params.slug);
  const products = await getAllAvtal();
  const wishList = await getWishList();

  return { props: { product, products, wishList }, revalidate: 10 };
}

export async function getStaticPaths() {
  const avtalWithSlugs = await getAllAvtal();
  return {
    paths: avtalWithSlugs?.edges.map(({ node }) => `/avtal/${node.slug}`) || [],
    fallback: false,
  };
}
