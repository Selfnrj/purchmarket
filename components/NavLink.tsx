import Link from "next/link";

type Props = {
  link: string;
  path: string;
  isActive: boolean;
  isNavCollapsed: boolean;
  setIsNavCollapsed: (isNavCollapsed: boolean) => void;
};

function NavLink({
  path,
  link,
  isActive,
  isNavCollapsed,
  setIsNavCollapsed,
}: Props) {
  return (
    <li>
      <Link
        href={path}
        className={`navLink ${isActive === true ? " active" : ""}`}
        aria-current="page"
        onClick={() => setIsNavCollapsed(!isNavCollapsed)}
      >
        {link}
      </Link>
    </li>
  );
}

export default NavLink;
