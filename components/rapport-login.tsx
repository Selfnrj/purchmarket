import { ArrowRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Container from "./container"

export default function RapportLogin() {
  return (
    <Container>
      <div className="text-center py-16">
        <p className="text-xl mb-8">Du behöver vara inloggad för att kunna se dina rapporer</p>
        <Link 
            href="/login"
            className="bg-white hover:bg-gray-200 px-6 py-3 font-bold rounded-full border border-gray-200 flex flex-row w-44 mx-auto justify-center"
          >
            Logga in
            <ArrowRightIcon className="h-6 w-6 ml-2 text-gray-900"/>
          </Link>
      </div>
    </Container>   
  )
}