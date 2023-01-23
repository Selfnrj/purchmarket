import Image from "next/image"
import Link from 'next/link'
import logoBlue from '../public/logo_blue.svg'

export default function Header({menuItems: {menuItems}}) {
  return (
    <div className="flex items-center justify-between mb-6 p-6 bg-white shadow-lg">
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
            {menuItems.edges.map((item) => (
              <li key={item.node.path}>
                <Link
                  className="p-4 ml-2 text-black font-medium hover:underline"
                  href={item.node.connectedNode.node.slug}
                >
                  {item.node.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button className="bg-white px-8 py-4 font-bold rounded-full shadow-lg">Logga in</button>
    </div>
  )
}
