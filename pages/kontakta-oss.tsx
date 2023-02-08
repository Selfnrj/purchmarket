import Image from "next/image";
import Link from "next/link";
import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactForm from "../components/contact-form";
import Container from "../components/container";
import PageCover from "../components/page-cover";
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
      <Breadcrumbs className="absolute z-40 text-gray-200" />
      <PageCover
        rubrik="Kontakta oss"
        text="Boka ett telefonmöte eller skriv till oss, så ringer vi dig när det
        passar."
        bild={OmslagsBild}
      />
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
                Detta innebär det att vara medlem hos Purch
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
                Kontakta medarbetare
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
