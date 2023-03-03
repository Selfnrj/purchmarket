import { ArrowRightIcon, UserIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function LoginBtn() {
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <>
          <div className="flex items-center">
            <Link
              className="flex items-center rounded-full border border-gray-200 bg-white px-4 py-3 text-gray-900 hover:bg-gray-200"
              href="/mina-sidor"
            >
              <b>Mina sidor</b>
              <UserIcon className="ml-2 h-6 w-6 text-gray-900" />
            </Link>
          </div>
        </>
      ) : (
        <div>
          <Link
            href="/login"
            className="flex items-center rounded-full border border-gray-200 bg-white px-6 py-3 font-bold text-gray-900 hover:bg-gray-200"
          >
            Logga in
            <ArrowRightIcon className="ml-2 h-6 w-6 text-gray-900" />
          </Link>
        </div>
      )}
    </div>
  );
}
