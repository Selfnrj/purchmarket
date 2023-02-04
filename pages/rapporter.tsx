import Image from "next/image";
import Container from "../components/container";
import { getAllRapporter } from "../lib/api";
import OmslagsBild from "../public/omslag.jpg";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import useAuth from "../hooks/useAuth";
import RapportLogin from "../components/rapport-login";
import UnAuthContent from "../components/UnAuthContent";
import Rapporter from "../components/rapporter";
import AuthContent from "../components/AuthContent";
import TabLink from "../components/tab-link";

export default function rapporter(allRapporter) {
  const { loggedIn } = useAuth();
  const totalCount = allRapporter.edges.length;

  return (
    <>
      <div className="wp-block-cover relative flex w-full items-center">
        <div className="absolute z-40 h-full w-full bg-black bg-opacity-50" />
        <div className="container relative z-40 mx-auto px-5 text-white">
          <h1 className="mb-8 max-w-2xl text-7xl font-black leading-tight">
            Rapporter
          </h1>
          <p className="max-w-lg text-xl leading-8">
            Här hittar du alla rapporter
          </p>
        </div>
        <Image
          fill
          placeholder="blur"
          className="object-cover"
          alt="header bild"
          src={OmslagsBild}
        />
      </div>

      {loggedIn ? (
        <Container>
          <Tab.Group>
            <div className="flex items-center justify-between border border-transparent border-b-gray-300">
              <TabLink tablinks={["Alla", "2022", "2021"]} />
              <p>Totalt: {totalCount} Rapporter </p>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <AuthContent>
                  <Rapporter />
                </AuthContent>
              </Tab.Panel>
              <Tab.Panel>2022</Tab.Panel>
              <Tab.Panel>2021</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Container>
      ) : (
        <UnAuthContent>
          <RapportLogin />
        </UnAuthContent>
      )}
    </>
  );
}

export async function getStaticProps() {
  const allRapporter = await getAllRapporter();
  return { props: allRapporter };
}
