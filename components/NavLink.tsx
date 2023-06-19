import Link from "next/link";

type Props = {
  link: string;
  path: string;
  isActive: boolean;
  setIsNavCollapsed: (arg: boolean) => () => void;
};

function NavLink({ path, link, isActive, setIsNavCollapsed }: Props) {
  return (
    <li>
      <Link
        href={path}
        className={`navLink ${isActive === true ? " active" : ""}`}
        aria-current="page"
        onClick={!setIsNavCollapsed as any}
      >
        {link}
      </Link>
    </li>
  );
}

export default NavLink;
