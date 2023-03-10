import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function profileInfo({ viewer }) {
  const { data: session } = useSession();
  //const { user } = useAuth();
  //const { firstName, lastName, avatar } = user as User;

  console.log(session);

  return (
    <div className="mt-24 mb-6 flex flex-col items-center">
      <Image
        width={200}
        height={200}
        className="mb-4 rounded-full"
        alt="arrow right"
        src={viewer.avatar.url}
      />
      <h2 className="text-4xl font-bold">{viewer.name}</h2>
    </div>
  );
}
