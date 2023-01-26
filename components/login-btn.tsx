import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useSession, signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import arrowRight from '../public/arrow-right.svg'

export default function LoginBtn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex items-center">
        <Link 
          className="bg-white hover:bg-gray-200 px-4 py-3 mr-4 rounded-full border border-gray-200 flex items-center" 
          href="/mina-sidor">
          <b>{session.user.name}</b>
          <Image
            width={32}
            height={32}
            className="ml-2 rounded-full"
            alt="arrow right"
            src={session.user.image} />
        </Link>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn()}
      className="bg-white hover:bg-gray-200 px-6 py-3 font-bold rounded-full border border-gray-200 flex items-center"
    >
        Logga in
        <ArrowRightIcon className="h-6 w-6 ml-2 text-gray-900"/>
        {/* <Image
              width={40}
              height={14}
              className="ml-4"
              alt="arrow right"
              src={arrowRight} /> */}
    </button>
  )
}