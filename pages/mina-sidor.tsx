import Container from "../components/container";
import MinaAvtal from "../public/mina-avtal.svg";
import KundNummer from "../public/mina-kundnummer.svg";
import Rapporter from "../public/rapporter.svg";
import SparadeAvtal from "../public/sparade-avtal.svg";
import ProfileCard from "../components/profile-card";
import ProfileInfo from "../components/profile-info";
import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Loader from "../components/Loader";

export default function Profile() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.replace("/");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Breadcrumbs />
      <Container>
        <ProfileInfo />
        <div className="mb-16 flex justify-center">
          <Link
            href="/installningar"
            className="mr-4 flex items-center rounded-full border border-gray-200 
            bg-white px-8 py-3 font-bold hover:bg-gray-200"
          >
            <Cog8ToothIcon className="mr-2 h-6 w-6 text-gray-900" />
            Inställningar
          </Link>
          <button
            className="flex items-center rounded-full border border-gray-200 bg-white px-4 py-3 font-bold hover:bg-gray-200 sm:px-8"
            onClick={() => signOut()}
          >
            <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6 text-gray-900" />
            Logga ut
          </button>
        </div>
        <div className="mb-16 grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-4">
          <ProfileCard
            Icon={MinaAvtal}
            Linkto="/mina-avtal"
            LinkText="Visa alla Mina Avtal"
            Title="Mina Avtal"
          />
          <ProfileCard
            Icon={SparadeAvtal}
            Linkto="/sparade-avtal"
            LinkText="Visa alla Sparade Avtal"
            Title="Sparade Avtal"
          />
          <ProfileCard
            Icon={Rapporter}
            Linkto="/rapporter"
            LinkText="Visa alla Rapporter"
            Title="Rapporter"
          />
          <ProfileCard
            Icon={KundNummer}
            Linkto="/kundnummer"
            LinkText="Visa mina Kundnummer"
            Title="Kundnummer"
          />
        </div>
      </Container>
    </div>
  );
}
