import Link from "next/link";

type Props = {
  link: string;
  path: string;
  isActive: boolean;
};

function NavLink({ path, link, isActive }: Props) {
  return (
    <li>
      <Link
        href={path}
        className={`navLink ${isActive === true ? " active" : ""}`}
        aria-current="page"
      >
        {link}
      </Link>
    </li>
  );
}

export default NavLink;
