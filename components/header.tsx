import Image from "next/image"
import Link from 'next/link'
import logoBlue from '../public/logo_blue.svg'
import LoginBtn from "./login-btn"

export default function Header() {

  return (
    <div className="flex items-center justify-between p-6 bg-white shadow-lg">
      <div className="flex items-center">
        <Link href="/" className="hover:underline">
          <Image 
            width={97}
            height={40}
            alt="logo"
            src={logoBlue} />
        </Link>
        <nav className="ml-16">
          <ul className="flex items-center justify-end flex-grow w-full">
            {/* {menuItems.edges.map(({ node }) => (
              <li key={node.path}>
                <Link
                  className="p-4 ml-2 text-black font-medium hover:underline"
                  href={node.connectedNode.node.slug}
                >
                  {node.label}
                </Link>
              </li>
            ))} */}
            <li>
              <Link 
                href="/avtal"
                className="p-4 ml-2 text-black font-medium hover:underline"
              >
                Hitta inköpsavtal
              </Link>
            </li>
            <li>
              <Link 
                href="/leverantorer"
                className="p-4 ml-2 text-black font-medium hover:underline"
              >
                  Leverantörer
              </Link>
            </li>
            <li>
              <Link 
                href="/rapporter"
                className="p-4 ml-2 text-black font-medium hover:underline"
              >
                Rapporter
              </Link>
            </li>
            <li>
              <Link 
                href="/nyheter"
                className="p-4 ml-2 text-black font-medium hover:underline"
              >
                Nyheter
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <LoginBtn />
    </div>
  )
}