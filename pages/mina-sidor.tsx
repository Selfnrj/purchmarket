import React from 'react'
import Container from "../components/container"
import Header from "../components/header"
import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import Image from "next/image"
import MinaAvtal from '../public/mina-avtal.svg'
import Rapporter from '../public/rapporter.svg'
import SparadeAvtal from '../public/sparade-avtal.svg'
import arrowRight from '../public/arrow-right.svg'
import Link from "next/link"

function profile() {
  const { data: session } = useSession()

  if (session) {
    let str = session.user.image;
    str.replace("?s=96&d=identicon", "");
    console.log(str);
    return (
      <Layout>
        <Header />
        <Container>
          <div className="flex flex-col items-center my-24">
            <Image
              width={200}
              height={200}
              className="mb-4 rounded-full"
              alt="arrow right"
              src={str.replace("?s=96&d=identicon", "?s=400")} />
              <h2 className="text-4xl font-bold">{session.user.name}</h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center rounded-3xl pt-24 bg-[#FFDCB8]">
              <Image
                width={80}
                height={80}
                className="mb-8"
                alt="icon"
                src={MinaAvtal} />
              <h3 className="text-2xl mb-36 font-bold text-[#17375E]">Mina Avtal</h3>
              <Link href="/" className="flex items-center mb-8 font-bold text-[#17375E]">
                Visa alla Mina Avtal
                <Image 
                  width={40}
                  height={14}
                  className="ml-4"
                  alt="arrow right"
                  src={arrowRight} />
              </Link>
            </div>
            <div className="flex flex-col items-center rounded-3xl pt-24 bg-[#FFDCB8]">
              <Image
                width={80}
                height={80}
                className="mb-8"
                alt="icon"
                src={SparadeAvtal} />
              <h3 className="text-2xl mb-36 font-bold text-[#17375E]">Sparade Avtal</h3>
              <Link href="/" className="flex items-center mb-8 font-bold text-[#17375E]">
                Visa alla Sparade Avtal
                <Image 
                  width={40}
                  height={14}
                  className="ml-4"
                  alt="arrow right"
                  src={arrowRight} />
              </Link>
            </div>
            <div className="flex flex-col items-center rounded-3xl pt-24 bg-[#FFDCB8]">
              <Image
                width={80}
                height={80}
                className="mb-8"
                alt="icon"
                src={Rapporter} />
              <h3 className="text-2xl mb-36 font-bold text-[#17375E]">Rapporter</h3>
              <Link href="/rapporter" className="flex items-center mb-8 font-bold text-[#17375E]">
                Visa alla Rapporter
                <Image 
                  width={40}
                  height={14}
                  className="ml-4"
                  alt="arrow right"
                  src={arrowRight} />
              </Link>
            </div>
          </div>
        </Container>
      </Layout>
    )
  }
}

export default profile