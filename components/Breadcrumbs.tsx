import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import Container from "./container";

const convertBreadcrumb = (string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü");
};

type Props = {
  className?: string;
};

function Breadcrumbs({ className }: Props) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <Container>
      <nav aria-label="breadcrumbs" className={`py-4 ${className}`}>
        <ol className={`breadcrumbs flex`}>
          <li>
            <Link className="mr-2 flex items-center" href="/">
              <HomeIcon className="mr-2 h-5 w-5" />
              Hem
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, i) => {
            return (
              <li className="last:font-bold" key={breadcrumb.href}>
                <span> / </span>
                <Link className="mx-2 capitalize" href={breadcrumb.href}>
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </Container>
  );
}

export default Breadcrumbs;
