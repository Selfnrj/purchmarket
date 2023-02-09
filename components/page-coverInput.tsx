import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent } from "react";

type Props = {
  rubrik: string;
  bild: StaticImageData;
  placeholder: string;
  value?: string;
  setSearchString: (value: string) => void;
};

export default function PageCoverInput({
  rubrik,
  bild,
  placeholder,
  value,
  setSearchString,
}: Props) {
  return (
    <div className="wp-block-cover relative flex w-full items-center justify-center">
      <div className="absolute z-20 h-full w-full bg-black bg-opacity-50" />
      <div className="relative z-30 flex flex-col text-white">
        <h1 className="mb-8 max-w-2xl text-5xl font-black leading-tight sm:text-7xl">
          {rubrik}
        </h1>
        <form action="">
          <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
            <MagnifyingGlassIcon className="absolute ml-3 h-6 w-6" />
            <input
              type="text"
              className="w-full rounded-full p-4 pl-12 text-black"
              placeholder={placeholder}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchString(e.target.value)
              }
            />
          </div>
        </form>
      </div>
      <Image fill className="object-cover" alt="header bild" src={bild} />
    </div>
  );
}
