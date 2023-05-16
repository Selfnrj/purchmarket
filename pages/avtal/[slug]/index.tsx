import Image from "next/image";
import Container from "../../../components/container";
import { getAllAvtal, getAvtal, getWishList } from "../../../lib/api";
import FileDownloader from "../../../components/FileDownloader";
import Link from "next/link";
import useAuth from "../../../hooks/useAuth";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import AuthContent from "../../../components/AuthContent";
import StarButton from "../../../components/star-button";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AvtalCard from "../../../components/avtal-card";
import { useEffect, useState } from "react";
import Script from "next/script";
import Head from "next/head";

export default function AvtalDetail({ product, products, wishList }) {
  //const size = filesize(avtal.avtalPdf?.pdf?.fileSize);
  const { loggedIn } = useAuth();

  const [favorite, setFavorite] = useState(wishList?.productIds);

  useEffect(() => {
    const data = window.localStorage.getItem("SAVE_FAVORITE");
    if (data !== null) setFavorite(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("SAVE_FAVORITE", JSON.stringify(favorite));
  }, [favorite]);

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
              {loggedIn ? (
                <AuthContent>
                  <StarButton
                    icon={false}
                    productId={product.productId}
                    favorite={favorite}
                    setFavorite={setFavorite}
                  />
                </AuthContent>
              ) : (
                ""
              )}
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <h2 className="mb-4 text-4xl font-bold">Om avtalet</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
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
          <div>
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
        <div className="my-16 rounded-3xl bg-[#FFDCB8] px-16 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="mb-2 text-4xl font-black leading-tight">
              Relaterade avtal
            </h1>
            <Link
              href="/avtal"
              className="flex items-center font-bold text-[#17375E]"
            >
              Visa alla avtal
              <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {products?.edges
              /* .filter((item) => item.node.avtalstyp.valjkund === "Alla") */
              .filter(
                (item) =>
                  item.node.productId !== product.productId &&
                  item.node.avtalstyp.valjkund === null
              )
              .slice(0, 2)
              .map((item) => (
                <AvtalCard
                  className="bg-white shadow-lg"
                  key={item.node.id}
                  productId={item.node.productId}
                  title={item.node.title}
                  excerpt={item.node.excerpt}
                  slug={item.node.slug}
                  categories={item.node.productCategories}
                  sourceUrl={item.node.featuredImage?.node.sourceUrl}
                  favorite={favorite}
                  setFavorite={setFavorite}
                />
              ))}
          </div>
        </div>
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
