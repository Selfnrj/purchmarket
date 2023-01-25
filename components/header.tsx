import Image from "next/image"
import Link from 'next/link'
import { useRouter } from "next/router";
import logoBlue from '../public/logo_blue.svg'
import LoginBtn from "./login-btn"
import NavLink from "./NavLink";

export default function Header() {
  const router = useRouter();

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
    <div className="flex items-center justify-between p-6 bg-white shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <Image 
            width={97}
            height={40}
            alt="logo"
            priority={true}
            src={logoBlue} />
        </Link>
        <nav className="ml-16 flex flex-1 items-center justify-end flex-grow w-full">
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
            {navlinks.map(({title, path}) => (
              <NavLink key={title} path={path} link={title} isActive={isActive(path)} />
            ))}
       
        </nav>
      </div>
      <LoginBtn />
    </div>
  )
}