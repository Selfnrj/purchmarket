import Container from "./container";
import logoWhite from "../public/logo_white.svg";
import arrowUp from "../public/arrow-up.svg";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="b mt-8 bg-[#111827] py-4 pt-16">
      <Container>
        <div className="relative md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="hover:underline">
              <Image width={120} height={50} alt="logo" src={logoWhite} />
            </Link>
          </div>
          <div className="my-16 grid grid-cols-2 gap-8 sm:my-0 sm:mr-24 sm:grid-cols-3 sm:gap-6">
            <div className="sm:mx-12">
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Sidor
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="" className="hover:underline">
                    Hitta inköpsavtal
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="" className="hover:underline">
                    Leverantörer
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="" className="hover:underline">
                    Min sida
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="" className="hover:underline">
                    Nyheter
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="" className="hover:underline">
                    Om oss
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sm:mx-12">
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Adress
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">Kungsportsavenyn 37</li>
                <li className="mb-4">411 36 Göteborg</li>
                <li>Sverige</li>
              </ul>
            </div>
            <div className="sm:mx-12">
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Komma Igång
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="" className="hover:underline">
                    Logga in
                  </Link>
                </li>
                <li>
                  <Link href="" className="hover:underline">
                    Kontakta oss
                  </Link>
                </li>
              </ul>
            </div>
            <button
              className="absolute top-0 right-0 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-center"
              onClick={handleScrollToTop}
            >
              <Image width={24} height={24} alt="Till toppen" src={arrowUp} />
            </button>
          </div>
        </div>
        <hr className="my-2 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-4" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              Purch
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex space-x-6 sm:mt-0 sm:justify-center">
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
  );
}
