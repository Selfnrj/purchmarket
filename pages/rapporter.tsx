import Image from "next/image"
import Container from "../components/container"
import { getAllRapporter } from "../lib/api";
import OmslagsBild from '../public/omslag.jpg'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import useAuth from "../hooks/useAuth";
import RapportLogin from "../components/rapport-login";
import UnAuthContent from "../components/UnAuthContent";
import Rapporter from "../components/rapporter";

export default function rapporter(allRapporter) {
  const { loggedIn } = useAuth();
  const totalCount = allRapporter.edges.length

  return (
    <>
    <div className="relative wp-block-cover w-full flex items-center">
      <div className="absolute h-full w-full bg-black bg-opacity-50 z-40" />
      <div className="text-white z-40 relative container mx-auto px-5">
          <h1 className="max-w-2xl leading-tight mb-8 text-7xl font-black">
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
        src={OmslagsBild} />
    </div>
    
    {loggedIn ? (
    <Container>
      <Tab.Group>
        <div className="flex items-center justify-between border border-transparent border-b-gray-300">
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`uppercase font-semibold p-4 outline-0 ${selected ? 'border-b-4 border-b-gray-900' : ''}`}
                >
                  Alla
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`uppercase font-semibold p-4 outline-0 ${selected ? 'border-b-4 border-b-gray-900' : ''}`}
                >
                  2022
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`uppercase font-semibold p-4 outline-0 ${selected ? 'border-b-4 border-b-gray-900' : ''}`}
                >
                  2021
                </button>
              )}
            </Tab>
          </Tab.List>
          <p>Totalt: {totalCount} Rapporter </p>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            <Rapporter />
          </Tab.Panel>
          <Tab.Panel>
            2022
          </Tab.Panel>
          <Tab.Panel>
            2021
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Container>
    ) : (
      <UnAuthContent>
        <RapportLogin />
      </UnAuthContent>
    )}
    </>
  )
}

export async function getStaticProps() {
  const allRapporter = await getAllRapporter();
  return { props: allRapporter };
}