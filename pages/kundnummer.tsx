import { gql, useQuery } from "@apollo/client";
import { GetStaticProps } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import { getUser } from "../lib/api";

export default function KundNummer({ viewer }) {
  const { catell, juzo, medema, mediqSverige } = viewer.kundnummer;

  return (
    <>
      <Breadcrumbs />
      <div className="mx-auto my-16 max-w-2xl rounded-3xl bg-[#DFEDFF] p-16">
        <h1 className="mb-8 text-center text-4xl font-black leading-tight">
          Kundnummer
        </h1>
        <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
          <b>Catell</b>
          <span>{catell}</span>
        </div>
        <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
          <b>Juzo</b>
          <span>{juzo}</span>
        </div>
        <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
          <b>Medema</b>
          <span>{medema}</span>
        </div>
        <div className="flex justify-between border border-transparent border-b-blue-200 p-4">
          <b>MediqSverige</b>
          <span>{mediqSverige}</span>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const viewer = await getUser();

  return {
    props: { viewer },
    revalidate: 10,
  };
};
