import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProfileCard({ Icon, Linkto, LinkText, Title }) {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-[#FFDCB8] pt-24">
      <Image width={80} height={80} className="mb-8" alt="icon" src={Icon} />
      <h3 className="mb-36 text-2xl font-bold text-[#17375E]">{Title}</h3>
      <Link
        href={Linkto}
        className="mb-8 flex items-center font-bold text-[#17375E]"
      >
        {LinkText}
        <ArrowRightIcon className="ml-2 h-6 w-6 text-gray-900" />
      </Link>
    </div>
  );
}

export default ProfileCard;
