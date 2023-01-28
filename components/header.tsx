import Image from "next/image"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useState } from "react";
import logoBlue from '../public/logo_blue.svg'
import LoginBtn from "./login-btn"
import NavLink from "./NavLink";

export default function Header() {
  const router = useRouter();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const isActive = (path: string) => {
    return router.pathname.split("/").pop() === path;
  };

  const navlinks = [
    {title: 'Hitta inköpsavtal', path: 'avtal'},
    {title: 'Leverantörer', path: 'leverantorer'},
    {title: 'Rapporter', path: 'rapporter'},
    {title: 'Nyheter', path: 'nyheter'},
  ]

  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-50 top-0 left-0 border-b border-gray-200 shadow-lg">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
      <Link href="/">
          <Image 
            width={97}
            height={40}
            alt="logo"
            priority={true}
            src={logoBlue} />
        </Link>
        <div className="flex md:order-2">
          <LoginBtn />
          <button onClick={handleNavCollapse} data-toggle="collapse" data-target="#navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center py-2 px-4 ml-4 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
        <div className={`${isNavCollapsed ? 'hidden' : ''} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-200 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 md:bg-white">
          {navlinks.map(({title, path}) => (
            <NavLink key={title} path={path} link={title} isActive={isActive(path)} />
          ))}
          </ul>
        </div>
      </div>
              {/* <nav className="ml-16 flex flex-1 items-center justify-end flex-grow w-full">
          {menuItems.edges.map(({ node }) => (
          <li key={node.path}>
            <Link
              className="p-4 ml-2 text-black font-medium hover:underline"
              href={node.connectedNode.node.slug}
            >
              {node.label}
            </Link>
          </li>
        ))} 
    </nav> */}
    </nav>

  )
}