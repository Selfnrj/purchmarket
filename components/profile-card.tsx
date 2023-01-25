import Image from "next/image"
import Link from "next/link"
import React from 'react'
import arrowRight from '../public/arrow-right.svg'


function ProfileCard({ Icon, LinkText, Title }) {
  return (
    <div className="flex flex-col items-center rounded-3xl pt-24 bg-[#FFDCB8]">
      <Image
        width={80}
        height={80}
        className="mb-8"
        alt="icon"
        src={Icon} />
      <h3 className="text-2xl mb-36 font-bold text-[#17375E]">{Title}</h3>
      <Link href="/rapporter" className="flex items-center mb-8 font-bold text-[#17375E]">
        {LinkText}
        <Image 
          width={40}
          height={14}
          className="ml-4"
          alt="arrow right"
          src={arrowRight} />
      </Link>
    </div>
  )
}

export default ProfileCard