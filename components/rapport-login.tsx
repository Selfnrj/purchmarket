import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Container from "./container";

export default function RapportLogin() {
  return (
    <Container>
      <div className="py-16 text-center">
        <p className="mb-8 text-xl">
          Du behöver vara inloggad för att kunna se dina rapporter
        </p>
        <Link
          href="/login"
          className="mx-auto flex w-44 flex-row justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-bold hover:bg-gray-200"
        >
          Logga in
          <ArrowRightIcon className="ml-2 h-6 w-6 text-gray-900" />
        </Link>
      </div>
    </Container>
  );
}
