import Container from "./container";
import logoWhite from "../public/logo_white.svg";
import arrowUp from "../public/arrow-up.svg";
import linkedin from "../public/linkedin.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111827] py-4 pt-16">
      <Container>
        <div className="relative md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="hover:underline">
              <Image
                className="h-auto w-auto"
                width={120}
                height={50}
                alt="logo"
                src={logoWhite}
              />
            </Link>
          </div>
          <div className="my-16 grid grid-cols-2 gap-8 sm:my-0 sm:mr-24 sm:grid-cols-3 sm:gap-6">
            <div className="sm:mx-12">
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Sidor
              </h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <Link href="/avtal" className="hover:underline">
                    Hitta inköpsavtal
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/leverantorer" className="hover:underline">
                    Leverantörer
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/mina-sidor" className="hover:underline">
                    Min sida
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/nyheter" className="hover:underline">
                    Nyheter
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/om-oss" className="hover:underline">
                    Om oss
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sm:mx-12">
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Adress
              </h2>
              <ul className="text-gray-400">
                <li className="mb-4">Kungsportsavenyn 37</li>
                <li className="mb-4">411 36 Göteborg</li>
                <li>Sverige</li>
              </ul>
            </div>
            <div className="sm:mx-12">
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Komma Igång
              </h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <Link href="login" className="hover:underline">
                    Logga in
                  </Link>
                </li>
                <li>
                  <Link href="/kontakta-oss" className="hover:underline">
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
        <hr className="my-2 border-gray-700 sm:mx-auto lg:my-4" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              Purch
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex space-x-6 sm:mt-0 sm:justify-center">
            <a href="https://linkedin.com/in/" target="_blank">
              <Image width={24} height={24} alt="linkedin" src={linkedin} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
