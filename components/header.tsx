import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import logoBlue from "../public/logo_blue.svg";
import LoginBtn from "./login-btn";
import NavLink from "./NavLink";
import { gql, useQuery } from "@apollo/client";

export default function Header() {
  const router = useRouter();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  const menuItems = data?.menus?.nodes[0].menuItems;

  const isActive = (path: string) => {
    return router.pathname.split("/").pop() === path;
  };

  const navlinks = [
    { title: "Hitta inköpsavtal", path: "/avtal" },
    { title: "Leverantörer", path: "/leverantorer" },
    { title: "Rapporter", path: "/rapporter" },
    { title: "Nyheter", path: "/nyheter" },
    { title: "Om oss", path: "/om-oss" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white py-3 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <Link href="/">
          <Image
            width={97}
            height={40}
            alt="logo"
            priority={true}
            src={logoBlue}
          />
        </Link>
        <div className="flex md:order-2">
          <LoginBtn />
          <button
            onClick={handleNavCollapse}
            data-toggle="collapse"
            data-target="#navbar-sticky"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            data-collapse-toggle="navbar-sticky"
            type="button"
            aria-controls="navbar-sticky"
            className="ml-4 inline-flex items-center rounded-lg py-2 px-4 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-gray-100 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            isNavCollapsed ? "hidden" : ""
          } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id="navbar-sticky"
        >
          <ul className="md:text-md mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-200 py-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:font-medium">
            {navlinks.map(({ title, path }) => (
              <NavLink
                key={title}
                path={path}
                link={title}
                isActive={isActive(path)}
                isNavCollapsed={isNavCollapsed}
                setIsNavCollapsed={setIsNavCollapsed}
              />
            ))}
            {menuItems?.edges?.map(({ node }) => (
              <NavLink
                key={node.label}
                path={node.path}
                link={node.label}
                isActive={isActive(node.path)}
                isNavCollapsed={isNavCollapsed}
                setIsNavCollapsed={setIsNavCollapsed}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const CURRENT_USER_QUERY = gql`
  query MainMenu {
    menus(where: { location: PRIMARY }) {
      nodes {
        menuItems {
          edges {
            node {
              path
              label
              connectedNode {
                node {
                  ... on Page {
                    isPostsPage
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
