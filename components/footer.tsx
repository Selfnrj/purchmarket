import Container from './container'
import logoWhite from '../public/logo_white.svg'
import arrowUp from '../public/arrow-up.svg'
import Image from "next/image"
import Link from "next/link"
import { SocialIcon } from "react-social-icons"

export default function Footer() {

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }

  return (
    <footer className="bg-[#111827] py-4 b pt-16">
      <Container>
      <div className="md:flex md:justify-between relative">
        <div className="mb-6 md:mb-0">
          <Link href="/" className="hover:underline">
            <Image 
              width={120}
              height={50}
              alt="logo"
              src={logoWhite} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 my-16 sm:my-0 sm:mr-24">
          <div className="sm:mx-12">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Sidor</h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <Link href="" className="hover:underline">Hitta inköpsavtal</Link>
              </li>
              <li className="mb-4">
                <Link href="" className="hover:underline">Leverantörer</Link>
              </li>
              <li className="mb-4">
                <Link href="" className="hover:underline">Min sida</Link>
              </li>
              <li className="mb-4">
                <Link href="" className="hover:underline">Nyheter</Link>
              </li>
              <li className="mb-4">
                <Link href="" className="hover:underline">Om oss</Link>
              </li>
            </ul>
          </div>
          <div className="sm:mx-12">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Adress</h2>
            <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  Kungsportsavenyn 37
                </li>
                <li className="mb-4">
                  411 36 Göteborg
                </li>
                <li>
                  Sverige
                </li>
            </ul>
          </div>
          <div className="sm:mx-12">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Komma Igång</h2>
            <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="" className="hover:underline">Logga in</Link>
                </li>
                <li>
                  <Link href="" className="hover:underline">Kontakta oss</Link>
                </li>
            </ul>
          </div>
          <button className="bg-gray-800 rounded-full h-16 w-16 text-center flex justify-center items-center absolute top-0 right-0" onClick={handleScrollToTop}>
            <Image 
              width={24}
              height={24}
              alt="Till toppen"
              src={arrowUp} />
          </button>
        </div>
      </div>
      <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <Link href="/" className="hover:underline">Purch</Link>. All Rights Reserved.
        </span>
        <div className="flex space-x-6 sm:justify-center sm:mt-0">
          <SocialIcon 
            url="https://linkedin.com/in/"
            fgColor="gray"
            bgColor="transparent"
          />
        </div>
      </div>
      </Container>
    </footer>
/*     <footer >
      <Container>
        <div className="py-28 flex">
          
          <div className="flex-1 grid grid-cols-3 gap-4 ml-64 text-white relative">
            <div className="">
              <h6 className="uppercase text-sm text-gray-400 mb-4">Sidor</h6>
              <ul>
                
              </ul>
            </div>
            <div>
              <h6 className="uppercase text-sm text-gray-400 mb-4">Adress</h6>
              <ul>
                
              </ul>
            </div>
            <div>
              <h6 className="uppercase text-sm text-gray-400 mb-4">Komma Igång</h6>
              <ul>
                
              </ul>
            </div>
            
          </div>
        </div>
        <div className="border border-transparent border-t-gray-600 flex justify-between items-center">
          <p className="text-gray-400 py-8"></p>
          
        </div>
      </Container>
    </footer> */
  )
}
