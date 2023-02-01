import { ArrowRightIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image"
import Link from "next/link"
import useAuth from "../hooks/useAuth";

export default function LoginBtn() {
    const { loggedIn } = useAuth();

    return (
      <div>
      {loggedIn ? (
        <>
        <div className="flex items-center">
        <Link 
          className="bg-white hover:bg-gray-200 px-4 py-3 rounded-full border border-gray-200 flex items-center" 
          href="/mina-sidor">
          <b>Mina sidor</b>
          <UserIcon className="h-6 w-6 ml-2 text-gray-900"/>
        </Link>
      </div>
        </>
      ) : (
        <div>
          <Link 
            href="/login"
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
          </Link>
        </div>
      )}
    </div>
  )  
}