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
    <footer className="bg-[#111827]">
      <Container>
        <div className="py-28 flex">
          <Link href="/" className="hover:underline">
            <Image 
              width={97}
              height={40}
              alt="logo"
              src={logoWhite} />
          </Link>
          <div className="w-full grid grid-cols-3 gap-4 ml-32 text-white relative">
            <div className="">
              <h6 className="uppercase text-sm text-gray-400 mb-4">Sidor</h6>
              <ul>
                <li className="my-2">
                  <Link href="">Hitta inköpsavtal</Link>
                </li>
                <li className="my-2">
                  <Link href="">Leverantörer</Link>
                </li>
                <li className="my-2">
                  <Link href="">Min sida</Link>
                </li>
                <li className="my-2">
                  <Link href="">Nyheter</Link>
                </li>
                <li className="my-2">
                  <Link href="">Om oss</Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="uppercase text-sm text-gray-400 mb-4">Adress</h6>
              <ul>
                <li className="my-2">
                  Kungsportsavenyn 37
                </li>
                <li className="my-2">
                  411 36 Göteborg
                </li>
                <li className="my-2">
                  Sverige
                </li>
              </ul>
            </div>
            <div>
              <h6 className="uppercase text-sm text-gray-400 mb-4">Komma Igång</h6>
              <ul>
                <li className="my-2">
                  <Link href="">Logga in</Link>
                </li>
                <li className="my-2">
                  <Link href="">Kontakta oss</Link>
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
        <div className="border border-transparent border-t-gray-600 flex justify-between items-center">
          <p className="text-gray-400 py-8">© 2023 Purch</p>
          <SocialIcon 
            url="https://linkedin.com/in/"
            fgColor="gray"
            bgColor="transparent"
          />
        </div>
      </Container>
    </footer>
  )
}
