import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContactForm from "../components/contact-form";
import Container from "../components/container";
import OmslagsBild from "../public/omslag.jpg";

type Props = {
  name: string;
  email: string;
  message: string;
  checkbox: boolean;
};

export default function KontaktaOss({ email, message, name, checkbox }: Props) {
  return (
    <>
      <div className="wp-block-cover relative flex w-full items-center">
        <div className="absolute z-40 h-full w-full bg-black bg-opacity-50" />
        <div className="container relative z-40 mx-auto px-5 text-white">
          <h1 className="mb-8 max-w-2xl text-7xl font-black leading-tight">
            Kontakta oss
          </h1>
          <p className="max-w-lg text-xl leading-8">
            Boka ett telefonmöte eller skriv till oss, så ringer vi dig när det
            passar.
          </p>
        </div>
        <Image
          fill
          placeholder="blur"
          className="object-cover"
          alt="header bild"
          src={OmslagsBild}
        />
      </div>
      <Container>
        <div className="my-16 rounded-3xl bg-[#FFDCB8] p-16">
          <div className="grid grid-cols-2 items-center gap-8">
            <div>
              <Image
                width={800}
                height={800}
                placeholder="blur"
                className="rounded-xl object-cover"
                alt="header bild"
                src={OmslagsBild}
              />
            </div>
            <div>
              <h1 className="mb-8 max-w-lg text-5xl font-black leading-tight">
                Vill du prata med oss?
              </h1>
              <p className="mb-12 text-xl leading-8">
                Ring, boka ett telefonmöte eller skriv till oss, så ringer vi
                dig när det passar.
              </p>
              <Link
                href=""
                className="mt-4 w-full cursor-pointer rounded-full bg-[#295080] py-4 px-8 text-white hover:bg-[#17375E]"
              >
                Boka telefonmöte
              </Link>
            </div>
          </div>
        </div>
        <div className="my-16 rounded-3xl bg-[#DFEDFF] p-16">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h1 className="mb-8 max-w-lg text-5xl font-black leading-tight">
                Kontakta oss via mail
              </h1>
              <ContactForm
                name={name}
                email={email}
                message={message}
                checkbox={checkbox}
              />
            </div>
            <div>
              <Image
                width={800}
                height={800}
                placeholder="blur"
                className="rounded-xl object-cover"
                alt="header bild"
                src={OmslagsBild}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
