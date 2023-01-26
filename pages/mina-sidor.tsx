import React from 'react'
import Container from "../components/container"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import MinaAvtal from '../public/mina-avtal.svg'
import Rapporter from '../public/rapporter.svg'
import SparadeAvtal from '../public/sparade-avtal.svg'
import ProfileCard from "../components/profile-card"
import { ArrowLeftOnRectangleIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"

function profile() {
  const { data: session } = useSession()

  if (session) {
    let str = session.user.image;
    str.replace("?s=96&d=identicon", "");
    console.log(str);
    return (
      <Container>
        <div className="flex flex-col items-center mt-24 mb-6">
          <Image
            width={200}
            height={200}
            className="mb-4 rounded-full"
            alt="arrow right"
            src={str.replace("?s=96&d=identicon", "?s=400")} />
            <h2 className="text-4xl font-bold">{session.user.name}</h2>
        </div>
        <div className="flex justify-center mb-16">
          <a 
            href="https://wordpress.com/me" 
            target="_blank"
            className="bg-white hover:bg-gray-200 px-6 py-3 font-bold rounded-full 
            border border-gray-200 flex items-center mr-4">
              <Cog8ToothIcon className="h-6 w-6 mr-2 text-gray-900"/>
              Inställningar
          </a>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-white hover:bg-gray-200 px-4 py-3 font-bold rounded-full border border-gray-200 flex items-center"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-2 text-gray-900"/>
            Logga ut
          </button>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <ProfileCard 
            Icon={MinaAvtal} 
            Linkto="/mina-avtal"
            LinkText="Visa alla Mina Avtal" 
            Title="Mina Avtal"
          />
          <ProfileCard 
            Icon={SparadeAvtal} 
            Linkto="/sparade-avtal"
            LinkText="Visa alla Sparade Avtal" 
            Title="Sparade Avtal"
          />
          <ProfileCard 
            Icon={Rapporter} 
            Linkto="/rapporter"
            LinkText="Visa alla Rapporter" 
            Title="Rapporter"
          />
        </div>
      </Container>
    )
  }
}

export default profile