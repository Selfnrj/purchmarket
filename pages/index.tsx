import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import {
  getAllAvtal,
  getAllPostsForHome,
  getIndex,
  getWishList,
} from "../lib/api";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import PageCover from "../components/page-cover";
import LatestStories from "../components/latest-stories";
import AvtalList from "../components/avtal-list";
import { Toaster } from "react-hot-toast";

export default function Index({ allPosts, products, wishList, IndexData }) {
  const { heroText, heroRubrik, heroBild } = IndexData.redigera;
  const {
    omossRubrik,
    omossText,
    omossBild,
    rapporterRubrik,
    rapporterText,
    rapporterBild,
  } = IndexData.landingSection;
  return (
    <>
      <Head>
        <title>Purchmarket</title>
      </Head>
      <Toaster />
      <div>
        <PageCover
          rubrik={heroRubrik}
          text={heroText}
          video={heroBild.mediaItemUrl}
          bild={heroBild.sourceUrl}
          type={heroBild.mediaType}
        />
        <Container>
          <LatestStories allPosts={allPosts} />
        </Container>
        <Link href="/om-oss">
          <div className="wp-block-cover relative flex w-full items-center">
            <div className="absolute z-40 h-full w-full bg-black bg-opacity-50" />
            <div className="container relative z-40 mx-auto px-5 text-white">
              <h1 className="mb-8 max-w-2xl text-5xl font-black leading-tight">
                {omossRubrik}
              </h1>
              <p className="mb-8 max-w-lg text-xl leading-8">{omossText}</p>
              <b className="flex items-center font-bold text-white">
                Om oss
                <ArrowRightIcon className="ml-2 h-6 w-6 text-white" />
              </b>
            </div>
            <Image
              fill
              sizes="100vw"
              className="object-cover"
              alt="header bild"
              src={omossBild?.sourceUrl}
            />
          </div>
        </Link>
        <Container>
          <AvtalList rubrik="Inköpsavtal" />
        </Container>
        <Link href="/rapporter">
          <div className="flex w-full items-center bg-[#DFEDFF] py-16">
            <div className="container mx-auto px-5">
              <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
                <div>
                  <h1 className="mb-8 max-w-lg text-5xl font-black leading-tight">
                    {rapporterRubrik}
                  </h1>
                  <p className="mb-8 text-xl leading-8">{rapporterText}</p>
                  <b className="flex items-center font-bold">
                    Rapporter
                    <ArrowRightIcon className="ml-2 h-6 w-6 text-[#17375E]" />
                  </b>
                </div>
                <div>
                  <Image
                    width={800}
                    height={800}
                    className="rounded-xl object-cover"
                    alt="header bild"
                    src={rapporterBild?.sourceUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPostsForHome();
  const products = await getAllAvtal();
  const wishList = await getWishList();
  const IndexData = await getIndex();

  return {
    props: { allPosts, products, wishList, IndexData },
    revalidate: 5,
  };
};
