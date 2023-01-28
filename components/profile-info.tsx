import Image from "next/image";
import React from 'react'
import useAuth, { User } from "../hooks/useAuth";

export default function profileInfo() {
  const { user } = useAuth();
  const { firstName, lastName, avatar } = user as User;

  return (
    <div className="flex flex-col items-center mt-24 mb-6">
      <Image
        width={200}
        height={200}
        className="mb-4 rounded-full"
        alt="arrow right"
        src={avatar.url} 
      />
      <h2 className="text-4xl font-bold">{firstName} {lastName}</h2>
    </div>
  )
}