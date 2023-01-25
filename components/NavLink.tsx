import Link from "next/link";

type Props = {
  link: string;
  path: string;
  isActive: boolean;
}

function NavLink({path, link, isActive}: Props) {
  return (
    <Link 
      href={`/${path}`}  
      className={`navLink ${ isActive === true ? " active" : "" }`} 
    >
      {link}
    </Link>
  )
}

export default NavLink