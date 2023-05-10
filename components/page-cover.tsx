import Image from "next/image";
import React from "react";

type Props = {
  rubrik: string;
  text: string;
  bild?: string;
  video?: string;
  type?: string;
};

function PageCover({ rubrik, text, bild, video, type }: Props) {
  return (
    <div className="wp-block-cover relative flex w-full items-center">
      <div className="absolute z-20 h-full w-full bg-black bg-opacity-50" />
      <div className="container relative z-30 mx-auto px-8 text-white">
        <h1 className="mb-8 max-w-2xl text-5xl font-black leading-tight sm:text-7xl">
          {rubrik}
        </h1>
        <p className="max-w-lg text-xl leading-8">{text}</p>
      </div>
      {type === "image" && (
        <Image
          fill
          priority
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="h-auto w-full object-cover"
          alt="header bild"
          src={bild}
        />
      )}
      {type === "file" && (
        <video
          autoPlay
          muted
          loop
          className="absolute z-10 h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default PageCover;
