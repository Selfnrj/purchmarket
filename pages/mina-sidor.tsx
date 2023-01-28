import Container from "../components/container"
import Image from "next/image"
import MinaAvtal from '../public/mina-avtal.svg'
import Rapporter from '../public/rapporter.svg'
import SparadeAvtal from '../public/sparade-avtal.svg'
import ProfileCard from "../components/profile-card"
import ProfileInfo from "../components/profile-info"
import { ArrowLeftOnRectangleIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"
import AuthContent from "../components/AuthContent"
import Link from "next/link"

export default function Profile() {

  return (
    <AuthContent>
      <Container>
        <ProfileInfo />
        <div className="flex justify-center mb-16">
          <Link 
            href="/settings" 
            className="bg-white hover:bg-gray-200 px-6 py-3 font-bold rounded-full 
            border border-gray-200 flex items-center mr-4">
              <Cog8ToothIcon className="h-6 w-6 mr-2 text-gray-900"/>
              Inställningar
          </Link>
          <Link 
            href="/logout"
            className="bg-white hover:bg-gray-200 px-4 py-3 font-bold rounded-full border border-gray-200 flex items-center"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-2 text-gray-900"/>
            Logga ut
          </Link>
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
    </AuthContent>
  )
}
